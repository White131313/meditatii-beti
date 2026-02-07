import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: true, // Lemon Squeezy works fine with bodyParser
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    // 1. Verify Signature (Security)
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(JSON.stringify(req.body)).digest('hex'), 'utf8');
    const signature = Buffer.from(req.headers['x-signature'] || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
        console.error('Invalid signature');
        return res.status(401).send('Invalid signature');
    }

    const payload = req.body;
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data; // Here we will get our user_id
    const userId = customData ? customData.user_id : null;

    console.log(`Received Lemon Squeezy event: ${eventName} for user: ${userId}`);

    // Initialize Supabase Admin
    const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 2. Handle Subscription Events
    try {
        if (eventName === 'subscription_created' || eventName === 'subscription_payment_success') {
            if (userId) {
                const customerId = payload.data.attributes.customer_id.toString();

                await supabase
                    .from('profiles')
                    .update({
                        subscription_status: 'active',
                        stripe_customer_id: customerId // Reusing the column for LS customer ID
                    })
                    .eq('id', userId);

                console.log(`Activated subscription for user: ${userId}`);
            }
        }

        if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired' || eventName === 'subscription_payment_failed') {
            const customerId = payload.data.attributes.customer_id.toString();

            await supabase
                .from('profiles')
                .update({ subscription_status: 'inactive' })
                .eq('stripe_customer_id', customerId);

            console.log(`Deactivated subscription for customer: ${customerId}`);
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook Error:', error.message);
        return res.status(500).json({ error: error.message });
    }
}
