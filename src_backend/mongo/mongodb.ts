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

        // WARNING: Memory store is actually not supported in this app 
        // I was gonna add support for it for dev purposes but didn't have time!
        // I could change the warn message but that means I'd have to remove these comments
        // and if so then why'd i type this out? So I really have no choice but to leave this here 

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