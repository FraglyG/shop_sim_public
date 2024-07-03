import mongoose from "mongoose";
import dotenv from "dotenv";
import { CONFIG } from "../config";

// SETUP
dotenv.config()

const CONNECT_URL = CONFIG.DB.URL

// EXPORTS
export async function initiateDatabase() {
    // check for mongodb connection
    if (!CONNECT_URL) {
        console.warn("No MongoDB connection URL provided provided, using memory store...")
        return true
    }

    // connect to db
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(CONNECT_URL)

        return true
    } catch (e) {
        console.error("Error connecting to MongoDB: " + e)
        return false
    }
}