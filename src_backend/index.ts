import "dotenv/config";
import { initiateServer } from "./server";
import { initiateDatabase } from "./mongo/mongodb";

async function initiate() {
    console.log("Starting Application");

    const results = await Promise.all([
        initiateServer(),
        initiateDatabase()
    ])

    if (results.some(result => !result)) {
        console.error("Failed to start application");
        process.exit(1);
    }
}

initiate();