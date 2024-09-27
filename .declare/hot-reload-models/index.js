// Overwrites the db with models in models/**/*, this file executed every time a file in models/**/* changes
const fs = require("fs");
const { ClickHouseClient } = require("@clickhouse/client");

const executeSql = async (sql) => {
    const db = new ClickHouseClient({
        url: "http://clickhouse:8123",
        username: "default",
        password: "password",
    });

    await db.query(sql);
};

async function main(db) {
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
            const schema = file.parentPath.split("/")[1];
            const table = file.parentPath.split("/")[2];
            return {
                fullPath,
                schema,
                table,
            };
        });
    for (const model of models) {
        // Template the sql with CREATE OR REPLACE VIEW schema.table AS (...model.sql...);
        const filePath = `./${model.fullPath}`;
        console.log(
            `Loading model ${model.schema}.${model.table} at ${model.fullPath}`
        );
        const fileContents = await fs.promises.readFile(filePath, {
            encoding: "utf8",
        });
        const finalSql = `CREATE OR REPLACE VIEW ${model.schema}.${model.table} AS (${fileContents})`;

        // Write it to db
        executeSql(finalSql).then(() => {
            console.log(`Model ${model.schema}.${model.table} loaded`);
        }).catch((err) => {
            throw err;
        })
    }
}

main()
    .then(() => console.log("Exiting"))
    .catch(console.error);
