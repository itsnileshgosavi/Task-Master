import { connectDb } from '@/helper/db';
import { User } from '@/models/user';
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, oldPass, newPass } = await req.json();
        await connectDb();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
    } catch (error) {
        
    }
}