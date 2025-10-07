// src/pages/api/login.ts
import pb from "../../../backend/backend.mjs";
import { Collections } from "../../utils/pocketbase-types.ts";

export const POST = async ({ request, cookies }) => {
    try {
        // Récupère l'email et le mot de passe envoyés dans la requête
        const { email, password } = await request.json();
        
        if (!email || !password) {
            return new Response(JSON.stringify({ 
                error: "Email et mot de passe requis" 
            }), { status: 400 });
        }

        // Authentifie l'utilisateur avec PocketBase en utilisant email et mot de passe
        const authData = await pb.collection(Collections.Users).authWithPassword(email, password);

        // Enregistre le token d'authentification dans un cookie sécurisé
        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/", // Le cookie est valide sur tout le site
            httpOnly: true, // Empêche l'accès au cookie côté client (JavaScript)
            sameSite: "strict", // Limite le cookie aux requêtes du même site pour plus de sécurité
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Expire dans 1 an
        });

        // Retourne les informations de l'utilisateur authentifié
        return new Response(JSON.stringify({ 
            success: true,
            user: authData.record 
        }), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        // En cas d'erreur d'authentification, retourne une erreur
        console.error("Erreur de connexion :", err);
        return new Response(JSON.stringify({ 
            success: false,
            error: "Identifiants invalides" 
        }), { 
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }
};