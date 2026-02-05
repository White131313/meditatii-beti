import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Important: Disable body parsing so we can verify the signature
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to read the raw body from the request
async function buffer(readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Verify Environment Variables
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('Missing Environment Variables');
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Read raw body
        const buf = await buffer(req);
        const rawBody = buf.toString('utf8');

        // Construct the event (verifies signature)
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Initialize Supabase Admin client (used for all events)
    const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    // Handle PAYMENT SUCCESS
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;

        console.log(`Payment success for user: ${userId}`);

        if (userId) {
            const { error } = await supabase.rpc('activeaza_abonament', {
                user_id_input: userId,
            });

            if (error) {
                console.error('RPC Error:', JSON.stringify(error));
                return res.status(500).json({ error: 'RPC failed: ' + error.message });
            }

            console.log(`Successfully activated subscription for user: ${userId}`);
        }
    }

    // Handle SUBSCRIPTION CANCELED (immediately or at period end)
    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        console.log(`Subscription deleted for customer: ${customerId}`);

        // Get customer email from Stripe
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const customer = await stripe.customers.retrieve(customerId);
        const customerEmail = customer.email;

        if (customerEmail) {
            // Deactivate by email (since we don't have user_id in subscription)
            const { error } = await supabase
                .from('profiles')
                .update({ subscription_status: 'inactive' })
                .eq('email', customerEmail);

            if (error) {
                console.error('Deactivation Error:', JSON.stringify(error));
                return res.status(500).json({ error: 'Deactivation failed: ' + error.message });
            }

            console.log(`Successfully deactivated subscription for: ${customerEmail}`);
        }
    }

    // Handle SUBSCRIPTION UPDATED (status change to canceled, unpaid, etc.)
    if (event.type === 'customer.subscription.updated') {
        const subscription = event.data.object;
        const status = subscription.status;
        const customerId = subscription.customer;

        console.log(`Subscription updated for customer: ${customerId}, status: ${status}`);

        // If subscription is no longer active
        if (status === 'canceled' || status === 'unpaid' || status === 'past_due') {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const customer = await stripe.customers.retrieve(customerId);
            const customerEmail = customer.email;

            if (customerEmail) {
                const { error } = await supabase
                    .from('profiles')
                    .update({ subscription_status: 'inactive' })
                    .eq('email', customerEmail);

                if (error) {
                    console.error('Status Update Error:', JSON.stringify(error));
                }

                console.log(`Deactivated subscription for: ${customerEmail} (status: ${status})`);
            }
        }
    }

    res.status(200).json({ received: true });
}
