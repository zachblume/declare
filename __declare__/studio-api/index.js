import { serve } from "bun";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 8000;
const routesPath = path.join(__dirname, "routes");

const routes = [];

// Recursively load route handlers and ignore bare folders
function loadRoutes(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            loadRoutes(fullPath);
        } else if (stat.isFile() && file.endsWith(".js")) {
            const route = require(fullPath);
            routes.push({
                path:
                    "/" +
                    path
                        .relative(routesPath, fullPath)
                        .replace(/\\/g, "/")
                        .replace(".js", ""),
                handler: route.default,
            });
        }
    });
}

loadRoutes(routesPath);

const server = serve({
    port,
    fetch(req) {
        const url = new URL(req.url);
        const route = routes.find((r) => r.path === url.pathname);
        if (route) {
            return route.handler(req);
        }
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Server running at http://localhost:${port}`);
