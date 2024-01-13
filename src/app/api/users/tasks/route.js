import jwt  from "jsonwebtoken";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { getResponseMessage } from "@/helper/getResponseMessage";

export async function GET(request){
    const token= request.cookies.get("loginToken")?.value;
    const data= jwt.verify(token, process.env.JWT_KEY);
    

    try {
        const user_Id =data.userID;
        const userstasks = await Task.find({
            userID:user_Id
        });
        
        return NextResponse.json(userstasks);
    } catch (error) {
        console.log(error);
        return getResponseMessage("error getting user's tasks", false,500);
    }
}