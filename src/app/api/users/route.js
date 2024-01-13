import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request) {
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(request) {
  const { name, email, password, profile_picture } = await request.json();

  try {
    const newUser = new User({
      name,
      email,
      password,
      profile_picture,
    });
    newUser.password = await bcrypt.hashSync(newUser.password, parseInt(process.env.BCRYPT_SALT));
    const createUser = await newUser.save();
    console.log(newUser);
    return NextResponse.json(createUser, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
      success: false,
    },{
      status:503
    });
  }
}
