import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URL as string);

    connection.isConnected == !!db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to database");
  }
};
