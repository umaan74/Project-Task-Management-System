
import mongoose from "mongoose";

async function ConnectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database Connected Successfully");

  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    throw error;
  }
}

export default ConnectDB;
