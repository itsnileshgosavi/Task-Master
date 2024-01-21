import jwt from "jsonwebtoken";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { getResponseMessage } from "@/helper/getResponseMessage";
import { connectDb } from "@/helper/db";

export async function GET(request) {
  try {
    const token = request.cookies.get("loginToken")?.value;

    if (!token) {
      return getResponseMessage("Token not provided", false, 401);
    }

    const data = jwt.verify(token, process.env.JWT_KEY);

    if (!data || !data.userID) {
      return getResponseMessage("Invalid token data", false, 401);
    }

    const user_Id = data.userID;
    await connectDb();
    const userstasks = await Task.find({
      userID: user_Id
    });

    return NextResponse.json(userstasks);
  } catch (error) {
    console.error("Error verifying token:", error);

    return getResponseMessage("Error getting user's tasks", false, 500);
  }
}
