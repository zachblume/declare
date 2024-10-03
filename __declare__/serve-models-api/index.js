import { createClient } from "@clickhouse/client";
import bun from "bun";

const port = process.env.PORT ?? 8001;

const db = createClient({
    url: process.env.CLICKHOUSE_HOST ?? "http://clickhouse:8123",
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
});

bun.serve({
    port: port,
    async fetch(req) {
        // Enable CORS for all routes
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS preflight requests
        if (req.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(req.url);
        const pathname = url.pathname;

        // Match the route /api/:database/:table
        const match = pathname.match(/^\/api\/([^\/]+)\/([^\/]+)$/);

        if (match && req.method === 'GET') {
            const database = match[1];
            const table = match[2];
            const query = `SELECT * FROM ${database}.${table}`;

            try {
                const result = await db.query({ query });
                const data = await result.json();

                return new Response(JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders,
                    },
                });
            } catch (err) {
                console.error(`Error querying ${database}.${table}:`, err);
                return new Response("Internal Server Error", {
                    status: 500,
                    headers: corsHeaders,
                });
            }
        }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
    error(err) {
        console.error(err);
    },
});

console.log(`Server is running on http://localhost:${port}`);
