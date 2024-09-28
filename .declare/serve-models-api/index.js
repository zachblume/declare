const express = require("express");
const cors = require("cors"); // Import the cors package
const { createClient } = require("@clickhouse/client");
const port = process.env.PORT ?? 8001;

const db = createClient({
    url: process.env.CLICKHOUSE_HOST ?? "http://clickhouse:8123",
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
});

async function main() {
    const app = express();

    app.use(cors()); // Enable CORS for all routes

    app.get("/api/:database/:table", async (req, res) => {
        const { database, table } = req.params;
        const query = `SELECT * FROM ${database}.${table}`;

        try {
            const result = await db.query({ query });
            const data = await result.json();
            res.json(data);
        } catch (err) {
            console.error(`Error querying ${database}.${table}:`, err);
            res.status(500).send("Internal Server Error");
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main().catch(console.error);
