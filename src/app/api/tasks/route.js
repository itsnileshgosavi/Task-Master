import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

export async function GET(request) {
  try {
    await connectDb();
    const task = await Task.find();

    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return getResponseMessage("error occured in get tasks", false, 404);
  }
}

export async function POST(request) {
  await connectDb();
  const { title, content, status } = await request.json();
  const token = request.cookies.get("loginToken")?.value;
  const data = jwt.verify(token, process.env.JWT_KEY);

  const userID = data.userID;
  try {
    const task = new Task({
      title,
      content,
      userID,
      status,
    });

    const createTask = await task.save();

    return NextResponse.json(createTask, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong!",
        success: false,
      },
      {
        status: 503,
      }
    );
  }
}
