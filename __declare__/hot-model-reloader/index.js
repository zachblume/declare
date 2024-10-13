import { watch, readFile } from "fs/promises";
const fs = require("fs");
const { createClient } = require("@clickhouse/client");
const { exec } = require('child_process');

const db = createClient({
    url:
        process.env.CLICKHOUSE_HOST ??
        "http://declare-warehouse-clickhouse:8123",
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
});

// Map to hold debounce timers for each file
const debounceMap = new Map();

// Watcher for file changes to models/**/**/definition.sql
async function main() {
    try {
        await runDbtCompile();
        await reloadAllModels();
        const watcher = watch("./", { recursive: true });
        for await (const event of watcher) {
            if (event.filename.endsWith("definition.sql")) {
                handleFileChange(event.filename);
            }
        }
    } catch (error) {
        console.error(`Error in main function: ${error.message}`);
    }
}
main();

function handleFileChange(filename) {
    if (debounceMap.has(filename)) {
        // Debounce: if there's a timeout already, we skip this event
        return;
    }

    // Reload model immediately
    reloadModel({ filename, shouldLog: true });

    // Set debounce timer for the filename
    const debounceTimeout = setTimeout(() => {
        debounceMap.delete(filename);
    }, 25); // Debounce delay of 10 milliseconds

    // Store the timer in the map
    debounceMap.set(filename, debounceTimeout);
}

async function reloadAllModels() {
    // Recursively list all files
    const files = await fs.promises.readdir("./models", {
        recursive: true,
        withFileTypes: true,
    });
    const models = files
        .filter((file) => file?.name === "definition.sql")
        .map((file) => ({ fullPath: `${file.parentPath}/${file.name}` }));

    // Load each model definition and apply it to db as a view, for quickness
    // Do it in parallel
    await Promise.all(
        models.map((model) =>
            reloadModel({ filename: model.fullPath, shouldLog: false })
        )
    );

    triggerEventLogWrite();

    console.log("Models loaded into local database");
}

async function reloadModel({ shouldLog = false, ...event }) {
    // Use bun api to reload a single model
    const file = event.filename;
    const matches = file.match(/models\/([^/]+)\/([^/]+)\/definition.sql/);
    const database = matches[1];
    const table = matches[2];

    try {
        const filePath = `./${file}`;
        const fileContents = await readFile(filePath, { encoding: "utf8" });

        const createDatabaseSql = `CREATE DATABASE IF NOT EXISTS ${database};`;
        const createViewSql = `CREATE OR REPLACE VIEW ${database}.${table} AS (${fileContents});`;

        await db.command({ query: createDatabaseSql });
        await db.command({ query: createViewSql });
    } catch (err) {
        console.error(
            `Error while loading model ${database}.${table}:`,
            err.message
        );
    }

    if (shouldLog) {
        console.log(`Model (re-)loaded: ${database}.${table}`);
    }
    triggerEventLogWrite();
}

async function triggerEventLogWrite() {
    try {
        // Write a log line to models/hot-model-reloader.log
        // Create the file if it doesn't exist
        const logFilePath = "./models/hot-model-reloader.log";
        await fs.promises.appendFile(logFilePath, `${new Date()}\n`);
    } catch (err) {
        console.error(`Error while writing log file`, err);
        throw err;
    }
}

function runDbtCompile() {
    return new Promise((resolve, reject) => {
        exec('dbt compile', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running dbt compile: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`dbt compile stderr: ${stderr}`);
            }
            console.log(`dbt compile stdout: ${stdout}`);
            resolve();
        });
    });
}
