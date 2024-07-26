import { getResponseMessage } from "../../../../helper/getResponseMessage";
import { User } from "../../../../models/user";
import { NextResponse } from "next/server";
import { connectDb } from "../../../../helper/db";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/auth";
import { Task } from "@/models/task";

// Delete User

export async function DELETE(request, { params }){
    const session  =await getServerSession(options);
    if (!session) {
        return getResponseMessage("session not provided", false, 401);
    }
    

    await connectDb();
    
   
    const userid =params.userid;
    const user= await User.findOne({ email:session.user.email });

    if (!user) {
        return getResponseMessage("User not found", false, 404);
    }
    
    if( session.user.email !== user.email){
        return getResponseMessage("Access Denied : Unauthorized", false, 401);
    }
   
    await User.deleteOne({
        _id:userid
    });
    await Task.deleteMany({userID:user._id});
    return getResponseMessage("user deleted", true, 200);
};

//update user data api

export async function PUT(request, { params }) {
    try {
        const session  =await getServerSession(options);
        if (!session) {
            return getResponseMessage("session not provided", false, 401);
        }

        await connectDb();

        const { userid } = params;
        const { name, email, about, profile_picture } = await request.json();
        let user = await User.findById(userid);

        if (user.email !== session.user.email) {
            return getResponseMessage("Access Denied : Unauthorized", false, 401);
        }

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
        return getResponseMessage("USER UPDATED", true, 200)
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in updating data", false, 500);
    }
};





