/** @type {import('next').NextConfig} */
// const mongoose = require('mongoose');

// const connectDb = async () => {
//   try {
//     const uri = process.env.MONGO_DB_URL;

//     if (!uri) {
//       console.error('MONGO_DB_URL environment variable is not set.');
//       process.exit(1);
//     }

//     await mongoose.connect(uri, {
//       dbName: "work_manager",
//     });

//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// connectDb();

// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   process.exit(0);
// });

// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected');
// });

const nextConfig = {}

module.exports = nextConfig;

