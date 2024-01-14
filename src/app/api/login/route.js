import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import { connectDb } from "@/helper/db";

connectDb();

export async function POST(request) {
  const { email, password } = await request.json();
  
  try {
    
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("User not found");
    }
   const matched = bcrypt.compareSync(password, user.password);
   
    if (!matched) {
      throw new Error("Incorrect password");
    }

   const token= Jwt.sign({
            userID:user._id,
            name:user.name,
    }, process.env.JWT_KEY);

    const response = NextResponse.json({
        message:"Logged In successfully",
        success:true,
        user: user,
    })

    response.cookies.set("loginToken", token,{expiresIn:"1d",});

   
    return response;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    }, {
      status: 401,
    });
  }
}
