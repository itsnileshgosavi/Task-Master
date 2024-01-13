import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({

    title: {
        type:String,
        required:true,
    },
    content:{
        type:String,
        required: [true, "content cannot be void"]},

    addedDate:{
        type:Date,
        required: true,
        default:Date.now(),   },

    status:{
        type:String,
        enum:["Pending", "Completed",],
        default:"Pending",
    },
    userID:{
        type:mongoose.ObjectId,
        required:true
    },

});

export const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);