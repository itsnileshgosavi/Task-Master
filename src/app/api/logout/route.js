import { NextResponse } from "next/server";

export async function POST(req){
    const response = NextResponse.json({
        message:"Logged Out",
        success:true
    });
    response.cookies.set("loginToken", "",{expires:new Date(0),});
    
    return response;
}