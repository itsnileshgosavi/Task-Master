import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDb } from "@/helper/db";
import Jwt  from "jsonwebtoken";



export async function GET(request) {
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request) {
  await connectDb();
  const { name, email, password, about, profile_picture } = await request.json();

  try {
    const newUser = new User({
      name,
      email,
      password,
      about,
      profile_picture,
    });
    newUser.password = await bcrypt.hashSync(newUser.password, parseInt(process.env.BCRYPT_SALT));
    const createUser = await newUser.save();

    // login automatically after sign up
    const token= Jwt.sign({
      userID:createUser._id,
      name:createUser.name,
}, process.env.JWT_KEY);

    
    console.log(newUser);
    const response =NextResponse.json(createUser, {
      status: 201,
    }, );
    response.cookies.set("loginToken", token,{expiresIn:"1d",});
    return response;

  } catch (error) {
    console.log(error);
    if(error.code===11000){
      return NextResponse.json({
        message: "user already exists",
        success: false,
      },{
        status:403
      });
    }else{
    return NextResponse.json({
      message: "Something went wrong!",
      success: false,
    },{
      status:503
    })}
  }
}
