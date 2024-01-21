import mongoose from "mongoose"


const config = {
    isConnected : 0,
};
export const connectDb =async()=>{
    if(config.isConnected){
        return;
    }
    try{
        const uri = process.env.MONGO_DB_URL;
      const { connection }= await mongoose.connect(uri, {
            dbName: "work_manager",
        });
        
        console.log("db connected");
        console.log(connection.readyState);
        config.isConnected= connection.readyState;
      
    }catch(error){
        console.log("something went wrong db connection failed");
        console.log(error);

    }
};
