import "dotenv/config";
import { initiateServer } from "./server";
import { initiateDatabase } from "./mongo/mongodb";

/*
Hendrik's note:
    This is the application's entrypoint
    we initiate all the necessary components here
*/

async function initiate() {
    console.log("Starting Application");

    // start these components in parallel to make it super fast >:)
    const results = await Promise.all([
        initiateServer(),
        initiateDatabase()
    ])

    // If any failed to start, we should exit the application - we don't want to run a broken application lol
    if (results.some(result => !result)) {
        console.error("Failed to start application");
        process.exit(1);
    }
}

initiate();