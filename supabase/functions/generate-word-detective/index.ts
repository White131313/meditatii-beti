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
        const { difficulty = 'medium' } = await req.json()

        // Define difficulty parameters
        const difficultySettings = {
            easy: {
                category_examples: [
                    "Animale domestice: pisica, câinele, iepurele",
                    "Fructe: mărul, para, banana",
                    "Culori: roșu, albastru, verde",
                    "Familie: mama, tata, sora"
                ]
            },
            medium: {
                category_examples: [
                    "Încălțăminte vs Fructe: pantof, sandale, cizme, MAR",
                    "Animale vs Obiecte: pisica, câinele, iepurele, MASA",
                    "Vehicule vs Alimente: mașina, bicicleta, autobuzul, PÂINE"
                ]
            },
            hard: {
                category_examples: [
                    "Verbe de mișcare vs Verb de gândire: alerga, sări, dansa, GÂNDI",
                    "Adjective de temperatură vs Mărime: cald, fierbinte, rece, MARE"
                ]
            }
        };

        const setting = difficultySettings[difficulty];

        // VOCABULAR STRICT APROBAT - DOAR ACESTE CUVINTE!
        const approvedWords = {
            animale: ["pisica", "câinele", "iepurele", "păsarea", "calul", "vaca", "porcul", "găina"],
            fructe: ["mărul", "para", "banana", "portocala", "căpșuna", "ciresele", "strugurele"],
            legume: ["morcovul", "roșia", "castravete", "varza", "cartof"],
            culori: ["roșu", "albastru", "verde", "galben", "portocaliu", "negru", "alb"],
            familie: ["mama", "tata", "sora", "fratele", "bunica", "bunicul"],
            incaltaminte: ["pantof", "sandale", "cizme", "papuc"],
            obiecte_scoala: ["caiet", "creion", "carte", "ghiozdan", "gumă"],
            alimente: ["pâine", "lapte", "brânză", "ou", "pui"],
            vehicule: ["mașina", "bicicleta", "autobuz", "tren"],
            verbe: ["aleargă", "sări", "dansează", "citește", "scrie", "cântă"]
        };

        const systemPrompt = `Tu ești un profesor care creează puzzle-uri "Găsește Intrusul" pentru copii de 5-8 ani.

REGULI STRICTE - CITEȘTE CU ATENȚIE:

1. VOCABULAR APROBAT - Folosește DOAR cuvintele din această listă:
   ${Object.entries(approvedWords).map(([cat, words]) => `${cat}: ${words.join(', ')}`).join('\n   ')}

2. NU folosi NICIODATĂ:
   ❌ Cuvinte cu ortografie greșită (ex: "cârțisor" în loc de "cărțișor")
   ❌ Cuvinte rare sau literare (ex: "căprioare", "zmeur")
   ❌ Cuvinte prea lungi sau complicate
   ❌ Cuvinte care NU sunt în lista de mai sus!

3. DIACRITICE CORECTE:
   ✅ "ă" în "măr", "cărțișor", "pară"
   ✅ "â" în "pâine", "vânt"
   ✅ "î" în "învață"
   ✅ "ș" în "școală"
   ✅ "ț" în "țară"

4. Creează un puzzle cu 4 opțiuni:
   - 3 elemente din ACEEAȘI categorie
   - 1 element DIFERIT (intrusul)

5. Nivel ${difficulty}:
   ${setting.category_examples.map(ex => `   - ${ex}`).join('\n')}

6. Adaugă explicație clară pentru copii de 5-8 ani

FORMAT JSON (fără markdown, fără comentarii):
{
  "options": ["mărul", "para", "banana", "pantof"],
  "correctAnswer": "pantof",
  "explanation": "Pantof este încălțăminte. Celelalte sunt fructe."
}

VERIFICARE ÎNAINTE DE RĂSPUNS:
✓ Toate cele 4 cuvinte există în vocabularul aprobat?
✓ Diacriticele sunt corecte 100%?
✓ Intrusul este EVIDENT diferit de celelalte 3?
✓ Explicația e simplă pentru un copil de 5 ani?`
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
                    { role: 'user', content: `Generate a "Find the Odd One Out" puzzle at ${difficulty} difficulty level in Romanian for children.` }
                ],
                temperature: 0.9,
                max_tokens: 500
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${JSON.stringify(data)}`)
        }

        let puzzleText = data.choices[0].message.content.trim()

        // Remove markdown code blocks if present
        puzzleText = puzzleText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

        const puzzle = JSON.parse(puzzleText)

        // Shuffle the options
        const shuffled = [...puzzle.options].sort(() => Math.random() - 0.5)

        return new Response(
            JSON.stringify({
                ...puzzle,
                options: shuffled,
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
