import mongoose from "mongoose";

const config = {
  isConnected: 0,
};
export const connectDb = async () => {
  if (config.isConnected) {
    return;
  }
  try {
    const uri = process.env.MONGO_DB_URL;
    //creating connection to database
    const { connection } = await mongoose.connect(uri, {
      dbName: "work_manager",
    });

    if (connection.readyState) {
      console.log("db connected");
      console.log(connection.readyState);
      config.isConnected = connection.readyState;
    }else{
      console.log("db not connected");
    }
  } catch (error) {
    console.log("db connection failed");
    console.log(error);
  }
};
