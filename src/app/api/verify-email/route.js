import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { Verifications } from "@/models/verifications";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, verificationCode } = await req.json();
        await connectDb();
        const ver = await Verifications.findOne({ email: email });
        if (!ver) {
            return NextResponse.json({ error: 'Verification code not found' }, { status: 404 });
        }
        if (ver.verificationCode != verificationCode) {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }
        await connectDb();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        // if (user.isVerified) {
        //     return NextResponse.json({ error: 'User already verified' }, { status: 400 });
        // }
        const x = await User.findOneAndUpdate({ email: email }, { isVerified: true });
        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}