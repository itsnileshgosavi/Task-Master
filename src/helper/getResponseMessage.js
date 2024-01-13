import { NextResponse } from "next/server"


export const getResponseMessage=(message, successStatus, statusCode)=> {
  return NextResponse.json({
    message:message,
    success:successStatus
  },{
     status:statusCode   
  })
};
