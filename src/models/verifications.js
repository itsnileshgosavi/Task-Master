import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "E-mail cannot be void"]
    },
    verificationCode: {
        type: Number
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now,
        expireAfterSeconds : 3600
    },
})

export const Verifications = mongoose.models.verifications || mongoose.model('verifications', verificationSchema);
   