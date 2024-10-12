import { readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default async function handler() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const directoryPath = join(__dirname, "../mount/dashboards");
    let dashboards = [];

    try {
        const dirExists = await stat(directoryPath)
            .then(() => true)
            .catch(() => false);
        if (!dirExists) {
            throw new Error("Directory does not exist");
        }
        const files = dirExists ? await readdir(directoryPath) : [];
        dashboards = files
            .filter((file) => file.endsWith(".jsx"))
            .map((file) => ({ name: file, path: join(directoryPath, file) }));

        return new Response(JSON.stringify(dashboards), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
