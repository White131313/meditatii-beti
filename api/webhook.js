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

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.client_reference_id;

        console.log(`Payment success for user: ${userId}`);

        if (userId) {
            // Initialize Supabase Admin client
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

            console.log(`Attempting to update profile for user: ${userId}`);

            // Try explicit SQL query via RPC first (most robust) or fallback to simple Update
            const { error } = await supabase
                .from('profiles')
                .update({ subscription_status: 'active' })
                .eq('id', userId);

            if (error) {
                console.error('Supabase update error:', JSON.stringify(error));
                // If "schema cache" error persists, it usually resolves itself after a few minutes of inactivity or a redeploy
                return res.status(500).json({ error: 'Database update failed: ' + error.message });
            }

            console.log(`Successfully activated subscription for user: ${userId}`);
        }
    }

    res.status(200).json({ received: true });
}
