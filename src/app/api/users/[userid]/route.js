import { getResponseMessage } from "../../../../helper/getResponseMessage";
import { User } from "../../../../models/user";
import { NextResponse } from "next/server";


export async function DELETE(request, { params }){
    
    const userid =params.userid;
    
    await User.deleteOne({
        _id:userid
    });
    return getResponseMessage("user deleted", true, 200);
};

export async function GET(request, { params }){
    try {
        const userid =params.userid;
        const user= await User.findById(userid);
    
        return NextResponse.json(user);
        
    } catch (error) {
        return getResponseMessage("error in deleting user", 500, false);
        
    }
};

export async function PUT(request, { params }){
    try {
            const { userid } = params;
            const {name, password, email, profile_picture}=await request.json();
            let user= await User.findById(userid);
            
            (user.name=name),
            (user.email=email),
            (user.password=password),
            (user.profile_picture=profile_picture)

           const updatedUser= await user.save();

           return NextResponse.json(updatedUser);
        } catch (error) {

            console.log(error);

            return getResponseMessage("Error in updating data", false, 500)
            
        }
};




