import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/');

export const POST = async ({ request }) => {
    try {
        const { prompt, code } = await request.json();
        
        if (!prompt || !code) {
            return new Response(JSON.stringify({ 
                error: "Prompt et code sont requis" 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const dataToSave = {
            prompt: prompt,
            code: code
        };

        const record = await pb.collection('SVG').create(dataToSave);

        return new Response(JSON.stringify({ 
            success: true,
            id: record.id,
            message: "SVG sauvegardé avec succès"
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ 
            error: "Erreur lors de la sauvegarde",
            details: error.message,
            pbError: error.response?.data || "Erreur inconnue"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};