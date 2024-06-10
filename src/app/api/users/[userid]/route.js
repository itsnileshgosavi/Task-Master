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

export async function PUT(request, { params }) {
    try {
        const { userid } = params;
        const { name, email, about, profile_picture } = await request.json();
        let user = await User.findById(userid);

        if (!user) {
            return getResponseMessage("User not found", false, 404);
        }

        // Update user fields
        user.name = name;
        user.email = email;
        user.profile_picture = profile_picture;
        user.about = about;

        // Save the updated user
        const updatedUser = await user.save();

        // Return the updated user as response
        return getResponseMessage("User data updated in db", true, 200)
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in updating data", false, 500);
    }
};





