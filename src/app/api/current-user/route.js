import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";


export async function GET(request) {
  
  try {
    
    const token = request.cookies.get("loginToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    const data = jwt.verify(token, process.env.JWT_KEY);

    if (!data || !data.userID) {
      return NextResponse.json({ error: "Invalid token data" }, { status: 401 });
    }
    await connectDb();
    const user = await User.findById(data.userID).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
