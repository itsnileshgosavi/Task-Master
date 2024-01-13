import mongoose from "mongoose"
// import { User } from "../models/user";


export const connectDb =async()=>{
    try{
        const uri = process.env.MONGO_DB_URL;
      const { connection }= await mongoose.connect(uri, {
            dbName: "work_manager",
        });
        
        console.log("db connected");
        // console.log(connection);
        // const uuser = new User({
        //     name: "test name",
        //     email: "testing@test.com",
        //     password:"testingpasword",
        //     about: "this is test about",
        //     profile_picture: "https://picsum.photos/seed/picsum/200/300",
            
        // });
        
        // await uuser.save();
        
        // console.log("user is created");
    }catch(error){
        console.log("something went wrong db connection failed");
        console.log(error);

    }
};
