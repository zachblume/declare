import { serve } from "bun";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 9998;
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
                path: path
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
    async fetch(req) {
        // Enable CORS for all routes
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (req.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(req.url);
        let pathname = url.pathname.replace(/^\/+|\/+$/g, "");

        // Return 200 to /status
        if (pathname === "status") {
            return new Response("OK", { status: 200 });
        }

        let route = routes.find((r) => r.path === pathname);
        if (!route) {
            route = routes.find((r) => r.path === pathname + "/index");
        }
        if (route) {
            const response = await route.handler(req);
            if (response instanceof Response) {
                response.headers.append("Access-Control-Allow-Origin", "*");
                response.headers.append(
                    "Access-Control-Allow-Methods",
                    "GET, POST, OPTIONS"
                );
                response.headers.append(
                    "Access-Control-Allow-Headers",
                    "Content-Type"
                );
                return response;
            }
            return new Response(response.body, {
                ...response,
                headers: {
                    ...response.headers,
                    ...corsHeaders,
                },
            });
        }
        console.log(`Not found: ${pathname}`, routes);
        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
});

console.log(`Studio API server running at http://localhost:${port}`);
