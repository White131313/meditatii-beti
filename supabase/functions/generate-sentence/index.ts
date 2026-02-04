import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { difficulty = 'easy' } = await req.json()

        // Define difficulty parameters - EXACT word counts
        const difficultySettings = {
            easy: {
                wordCount: 3,
                description: 'EXACT 3 words - Subject + Verb + Object',
                examples: [
                    'Pisica bea lapte.',
                    'Copilul mănâncă mere.',
                    'Mama citește ziarul.',
                    'Fratele aleargă repede.',
                    'Soarele strălucește frumos.'
                ]
            },
            medium: {
                wordCount: 4,
                description: 'EXACT 4 words - Add one adjective or preposition',
                examples: [
                    'Pisica neagră bea lapte.',
                    'Copilul mic mănâncă mere.',
                    'Mama gătește o supă.',
                    'Fratele aleargă în parc.',
                    'Fetița desenează un copac.'
                ]
            },
            hard: {
                wordCount: 5,
                description: 'EXACT 5 words - More complex structure',
                examples: [
                    'Bunica face plăcinte calde dimineața.',
                    'Câinele mare aleargă prin grădină.',
                    'Copiii se joacă afară veseli.',
                    'Tatăl citește o carte groasă.',
                    'Sora mea desenează flori colorate.'
                ]
            }
        }

        const setting = difficultySettings[difficulty] || difficultySettings.easy

        const systemPrompt = `Tu ești un profesor de limba română care creează exerciții pentru copii.

REGULI STRICTE:
1. Creează o propoziție în limba română cu EXACT ${setting.wordCount} cuvinte
2. ${setting.description}
3. Propoziția TREBUIE să fie:
   - GRAMATICAL CORECTĂ (sintaxă românească corectă)
   - NATURALĂ și FIREASCĂ (așa cum vorbesc oamenii în viața reală)
   - Cu SENS LOGIC (subiectul și acțiunea trebuie să fie compatibile!)
   
4. VALIDARE SEMANTICĂ - Verifică:
   - Dacă e vorba de mâncare: Doar ființele vii pot mânca, și doar lucruri comestibile!
   - Dacă e vorba de acțiuni: Subiectul trebuie să poată face acea acțiune!
   - Dacă e un verb, obiectul trebuie să fie compatibil cu verbul!

5. Folosește structura: Subiect + Verb + Complement (ordine naturală românească)

6. NU FOLOSI NICIODATĂ combinații absurde:
   ❌ "Mama mâncă cartea" (cărțile nu se mănâncă!)
   ❌ "Vântul murmură frumos" (vântul suflă, nu murmură)
   ❌ "Câinele latră fosnind" (prea poetic/nenatural)
   ❌ "Pisica citește ziarul" (pisicile nu citesc)
   ❌ "Masa aleargă repede" (mesele nu aleargă)
   
7. FOLOSEȘTE doar combinații logice:
   ✅ "Mama citește cartea" (mamele citesc)
   ✅ "Pisica bea lapte" (pisicile beau lapte)
   ✅ "Câinele aleargă repede" (câinii aleargă)
   ✅ "Copilul mănâncă mere" (copiii mănâncă mere)
   ✅ "Tatăl construiește casa" (oamenii construiesc case)

8. Cuvinte permise:
   - Subiecte: oameni (mama, tata, copilul, fratele, sora, bunica), animale domestice (pisica, câinele, păsările)
   - Verbe: acțiuni simple și concrete (mănâncă, bea, aleargă, doarme, joacă, citește, scrie, desenează)
   - Obiecte: doar lucruri care au sens cu verbul ales!

9. NU repeta aceleași cuvinte/teme din ultimele cereri
10. Adaugă traducerea corectă în maghiară

EXEMPLE CORECTE pentru nivelul ${difficulty}:
${setting.examples.map(ex => `- ${ex}`).join('\n')}

RETURNEAZĂ DOAR JSON (fără markdown, fără text adițional):
{
  "original": ["Pisica", "bea", "lapte"],
  "scrambled": ["lapte", "Pisica", "bea"],
  "translation_hu": "A macska tejet iszik"
}

IMPORTANT - VERIFICĂ ÎNainte DE RĂSPUNS:
✓ Are sens logic combinația Subiect + Verb + Obiect?
✓ Array-ul "original" = ordinea CORECTĂ a cuvintelor (exact ${setting.wordCount} cuvinte)
✓ Array-ul "scrambled" = ACELEAȘI cuvinte în ordine COMPLET DIFERITĂ!
✓ În "scrambled", NICIUN cuvânt NU trebuie să fie pe poziția corectă!
✓ În "scrambled", cuvinte consecutive din "original" NU apar unul lângă altul!
✓ Propoziția sună NATURAL când o citești cu voce tare
✓ Numărul de cuvinte în ambele array-uri = EXACT ${setting.wordCount}

EXEMPLU CORECT:
original: ["Mama", "citește", "cartea"]
scrambled: ["cartea", "Mama", "citește"] ✅ (toate pe poziții diferite, nu apar consecutive)

EXEMPLU GREȘIT:
original: ["Mama", "citește", "cartea"]
scrambled: ["Mama", "cartea", "citește"] ❌ ("Mama" e pe poziția 0 în ambele!)
scrambled: ["citește", "cartea", "Mama"] ❌ ("citește" și "cartea" consecutive din original!)

ULTRA-IMPORTANT: Scrambled trebuie să fie un array de CUVINTE INDIVIDUALE, nu expresii!
✅ ["bea", "Pisica", "lapte"] - CORECT
❌ ["bea lapte", "Pisica"] - GREȘIT (expresie, nu cuvinte separate!)`

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Generează o propoziție românească corectă gramatical, cu EXACT ${setting.wordCount} cuvinte, pentru nivel ${difficulty}. Tema: ${['animale', 'familie', 'natură', 'școală', 'jocuri', 'mâncare', 'case'][Math.floor(Math.random() * 7)]}.` }
                ],
                temperature: 1.2,
                max_tokens: 300
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${JSON.stringify(data)}`)
        }

        let sentenceText = data.choices[0].message.content.trim()

        // Remove markdown code blocks if present
        sentenceText = sentenceText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

        const sentence = JSON.parse(sentenceText)

        // Ensure scrambled is actually different from original
        if (JSON.stringify(sentence.original) === JSON.stringify(sentence.scrambled)) {
            sentence.scrambled = [...sentence.original].sort(() => Math.random() - 0.5)
        }

        return new Response(
            JSON.stringify({
                ...sentence,
                difficulty
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (error) {
        console.error('Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            }
        )
    }
})
