import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { getResponseMessage } from "@/helper/getResponseMessage";
import { connectDb } from "@/helper/db";
import { getServerSession } from "next-auth";
import { User } from "@/models/user";
import { options } from "../../auth/[...nextauth]/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(options);
    if (!session) {
      return getResponseMessage("session not provided", false, 401);
    }

    

    if (!session || !session.user ) {
      return getResponseMessage("Invalid token data", false, 401);
    }

    await connectDb();
    const user = await User.findOne({ 
      email:session.user.email
    })
   
    const userstasks = await Task.find({
      userID: user._id
    });

    return NextResponse.json(userstasks);
  } catch (error) {
    console.error("Error verifying token:", error);

    return getResponseMessage("Error getting user's tasks", false, 500);
  }
}
