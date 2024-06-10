import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "../../../models/user"
import { connectDb } from "../../../helper/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/auth";


export async function GET(req) {
  
  try {

    const session = await getServerSession(options);
    
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDb();
    const user = await User.findOne( { email: session.user.email }).select('-password');
    //console.log(user);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
