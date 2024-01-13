/** @type {import('next').NextConfig} */
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_DB_URL;
    await mongoose.connect(uri, {
      dbName: "work_manager",
      
    });

   console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); 
  }
};

connectDb();

const nextConfig = {}

module.exports = nextConfig
