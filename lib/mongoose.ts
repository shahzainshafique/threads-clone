import mongoose from "mongoose";

let isConnectedToDb = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL)
    return console.log("MongoDB URL is missing from config!");
  if (isConnectedToDb) return console.log("Already connected to DB");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnectedToDb = true;
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};
