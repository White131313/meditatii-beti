import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

serve(async (req) => {
    console.log("Webhook received! Method:", req.method);

    try {
        const body = await req.text()
        console.log("Raw Body:", body.substring(0, 200) + "...") // Log first 200 chars

        // Parse JSON directly without verification
        const event = JSON.parse(body);

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            const userId = session.client_reference_id

            if (userId) {
                console.log(`Processing subscription for user: ${userId}`)
                const { error } = await supabase
                    .from('profiles')
                    .update({ subscription_status: 'active' })
                    .eq('id', userId)

                if (error) {
                    console.error('Error updating profile:', error)
                    return new Response('Error updating profile', { status: 500 })
                }
                console.log(`Successfully activated subscription for user: ${userId}`)
            } else {
                console.log("No user ID found in session.")
            }
        }

        return new Response(JSON.stringify({ received: true, status: "Debugging Mode - Success" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (err) {
        console.error("Critical Error processing webhook:", err.message)
        return new Response(`Server Error: ${err.message}`, { status: 400 })
    }
})
