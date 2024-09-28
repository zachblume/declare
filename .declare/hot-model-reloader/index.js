// Overwrites the db with models in models/**/*, this file executed every time a file in models/**/* changes
const fs = require("fs");
const { createClient } = require("@clickhouse/client");

const db = createClient({
    url: process.env.CLICKHOUSE_HOST ?? "http://clickhouse:8123",
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
});

const executeSql = async (query) => {
    return await db.exec({ query });
};

async function main() {
    // Recursively list all files in models/**/* along with metadata
    const files = await fs.promises.readdir("./models", {
        recursive: true,
        withFileTypes: true,
    });
    const models = files
        .filter((file) => file.isFile())
        // only files ending w .sql
        .filter((file) => file.name == "definition.sql")
        .map((file) => {
            const fullPath = `${file.parentPath}/${file.name}`;
            const database = file.parentPath.split("/")[1];
            const table = file.parentPath.split("/")[2];
            return {
                fullPath,
                database,
                table,
            };
        });

    // Load each model definition and apply it to db as a view, for quickness
    for (const model of models) {
        const filePath = `./${model.fullPath}`;
        const fileContents = await fs.promises.readFile(filePath, {
            encoding: "utf8",
        });

        const createDatabaseSql = `CREATE DATABASE IF NOT EXISTS ${model.database};`;
        const dropViewSql = `DROP VIEW IF EXISTS ${model.database}.${model.table};`;
        const createViewSql = `CREATE VIEW ${model.database}.${model.table} AS (${fileContents});`;

        try {
            await executeSql(createDatabaseSql);
            await executeSql(dropViewSql);
            await executeSql(createViewSql);
        } catch (err) {
            console.error(`Error while loading model ${model.database}.${model.table}:`, err);
            throw err;
        }
    }

    console.log("Models reloaded");
}

main()
    .then(()=>null)
    .catch(console.error);
