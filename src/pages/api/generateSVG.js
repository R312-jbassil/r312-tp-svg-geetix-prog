import { OpenAI } from 'openai';

const HF_TOKEN = import.meta.env.HF_TOKEN;

export const POST = async ({ request }) => {
    try {
        const { messages } = await request.json();
        
        if (!Array.isArray(messages)) {
            return new Response(JSON.stringify({ 
                error: "Messages doit être un tableau",
                received: typeof messages
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        const client = new OpenAI({
            baseURL: import.meta.env.HF_URL,
            apiKey: HF_TOKEN,
        });

        let SystemMessage = {
            role: "system",
            content: "You are an SVG code generator. Generate SVG code for the following messages. Make sure to include ids for each part of the generated SVG. Always return valid SVG code even for modifications.",
        };

        const chatCompletion = await client.chat.completions.create({
            model: "meta-llama/Llama-3.1-8B-Instruct:novita",
            messages: [SystemMessage, ...messages]
        });

        const message = chatCompletion.choices[0].message || "";

        const svgMatch = message.content.match(/<svg[\s\S]*?<\/svg>/i);

        if (svgMatch) {
            message.content = svgMatch[0];
        }

        return new Response(JSON.stringify({ svg: message }), {
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ 
            error: "Erreur lors de la génération",
            details: error.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};