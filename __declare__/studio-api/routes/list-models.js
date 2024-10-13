import { readdir, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default async function handler() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const directoryPath = join(__dirname, "../mount/models");

    try {
        const dirExists = await stat(directoryPath)
            .then(() => true)
            .catch(() => false);
        if (!dirExists) {
            throw new Error("Directory does not exist");
        }
        async function getFilesRecursively(directory) {
            const entries = await readdir(directory, { withFileTypes: true });
            const files = await Promise.all(
                entries.map(async (entry) => {
                    const fullPath = join(directory, entry.name);
                    return entry.isDirectory()
                        ? getFilesRecursively(fullPath)
                        : fullPath;
                })
            );
            return Array.prototype.concat(...files);
        }

        const files = dirExists ? await getFilesRecursively(directoryPath) : [];
        const models = files
            .filter((file) => file.endsWith("definition.sql"))
            .map((file) => ({ name: file, path: join(directoryPath, file) }));
        console.log({ models });

        return new Response(JSON.stringify(models), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
