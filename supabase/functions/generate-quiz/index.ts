import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { text, lang } = await req.json()

        if (!text) {
            return new Response(JSON.stringify({ error: 'Niciun text furnizat.' }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            })
        }

        const prompt = `
      Ești un profesor expert în pedagogie și limba română. Generează un quiz format din EXACT 5 întrebări bazate pe acest text: "${text}".
      
      IMPORTANT: 
      1. Generează un MIX de întrebări:
         - 3 întrebări de tip "choice" (grilă cu 4 variante).
         - 2 întrebări de tip "text" (unde elevul trebuie să scrie manual răspunsul).
      2. Atenție la gramatică și sintaxă: Folosește o limbă română impecabilă.
         - Evită greșelile de tipul "Ce concurs a participat?" și folosește corect prepozițiile: "La ce concurs a participat?".
      
      Limba: ${lang === 'HU' ? 'Maghiară' : 'Română'}.
      
      Format JSON strict:
      {
        "questions": [
          {
            "type": "choice",
            "question": "...",
            "options": ["...", "...", "...", "..."],
            "correct": 0,
            "explanation": "..."
          },
          {
            "type": "text",
            "question": "...",
            "correctAnswer": "...",
            "explanation": "..."
          }
        ]
      }
    `

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Ești un asistent care răspunde doar cu JSON valid.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            })
        })

        const result = await response.json()
        if (!response.ok) throw new Error(result.error?.message || 'OpenAI API Error')

        const content = JSON.parse(result.choices[0].message.content)
        const questions = content.questions || []

        return new Response(JSON.stringify({ questions }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message, questions: [] }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })
    }
})
