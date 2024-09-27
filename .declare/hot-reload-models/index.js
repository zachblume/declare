// Overwrites the db with models in models/**/*, this file executed every time a file in models/**/* changes
const fs = require("fs");
const {ClickHouseClient} = require("@clickhouse/client");

const executeSql = async (sql) => {
    const db = new ClickHouseClient({
        url: "http://clickhouse:8123",
        username: "default",
        password: "default",
    });

    await db.query(sql);
};

module.exports = async function (db) {
    // Recursively list all files in models/**/* along with metadata
    const files = await fs.promises.readdir("./models", {
        recursive: true,
        withFileTypes: true,
    });
    const models = files
        .filter((file) => file.isFile())
        .map((file) => {
            const path = file.name;
            const name = path.split("/").slice(1).join("/").replace(".js", "");
            return { path, name };
        });
    for (const model of models) {
        // Template the sql with CREATE OR REPLACE VIEW schema.table AS (...model.sql...);
        const fileContents = await fs.promises.readFile(
            `./models/${model.path}`,
            { encoding: "utf8" }
        );
        const finalSql = `CREATE OR REPLACE VIEW ${model.name} AS (${fileContents})`;

        // Write it to db
        executeSql(finalSql);
    }
};
