import { connectDb } from '@/helper/db';
import { User } from '@/models/user';
import { Verifications } from '@/models/verifications';
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, newPass, verificationCode } = await req.json();
        await connectDb();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const ver = await Verifications.findOne({ email: email });
        if (!ver) {
            return NextResponse.json({ error: 'Verification code not found' }, { status: 404 });
        }
        console.log("verificationCode", verificationCode);
        console.log("db vc", ver.verificationCode);
        if (ver.verificationCode != verificationCode) {
            return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
        }
        const newhash = await bcrypt.hashSync(newPass, parseInt(process.env.BCRYPT_SALT));
        user.password = newhash;
        await user.save();

        await Verifications.deleteMany({ email: email });
        return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}