import pb from "../../../backend/backend.mjs";

export const POST = async ({ cookies }) => {
    try {
        // Vide l'authentification PocketBase
        pb.authStore.clear();
        
        // Supprime le cookie d'authentification
        cookies.delete("pb_auth", {
            path: "/",
        });

        return new Response(JSON.stringify({ 
            success: true,
            message: "Déconnexion réussie" 
        }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        console.error("Erreur de déconnexion :", err);
        return new Response(JSON.stringify({ 
            success: false,
            error: "Erreur lors de la déconnexion" 
        }), { 
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};