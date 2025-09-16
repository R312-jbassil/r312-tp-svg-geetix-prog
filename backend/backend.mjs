import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

export async function addSVG({ code, prompt, image }) {
    const data = {
        code: code,
        prompt: prompt,
        image: image
    };
    try {
        const record = await pb.collection('SVG').create(data);
        return record;
    } catch (error) {
        console.error('Erreur lors de l’ajout du SVG :', error);
        throw error;
    }
}