import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    name: String,
    email:{
        type:String,
        lowercase: true,
        unique:true,
        required: [true, "E-mail cannot be void"]},

    password:{
        type:String,
        required: [true, "Password cannot be void"]},
    about:String,
    profile_picture:String,
    createDate:{
        type:Date,
        required: true,
        default:Date.now(),
    },

});

export const User = mongoose.models.users || mongoose.model("users", userSchema);