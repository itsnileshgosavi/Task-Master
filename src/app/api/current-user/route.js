import { NextResponse } from "next/server";
import jwt  from "jsonwebtoken";
import { User } from "@/models/user";

export async function GET(request){
   const token= request.cookies.get("loginToken")?.value;
   const data= jwt.verify(token, process.env.JWT_KEY);
   const user = await User.findById(data.userID).select("-password");

   return NextResponse.json(user);
}