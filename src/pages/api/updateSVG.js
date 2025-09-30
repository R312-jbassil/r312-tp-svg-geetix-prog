import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/');

export const POST = async ({ request }) => {
    try {
        const { id, code, chat_history } = await request.json();

        if (!id) {
            return new Response(JSON.stringify({ 
                success: false, 
                error: "ID manquant" 
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Mettre à jour l'enregistrement dans PocketBase
        const updatedRecord = await pb.collection('SVG').update(id, {
            code: code,
            chat_history: chat_history
        });

        return new Response(JSON.stringify({ 
            success: true, 
            data: updatedRecord 
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            error: error.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};