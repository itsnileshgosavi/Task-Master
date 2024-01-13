import { getResponseMessage } from "@/helper/getResponseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request, { params }){
        const { taskId } = params;
        
        try {
            const task= await Task.findById(taskId);
            return NextResponse.json(task);
            
        } catch (error) {
            console.log(error);
           return getResponseMessage("Error in getting data", false, 500)
            
        }
};




export async function PUT(request, { params }){
    try {
            const { taskId } = params;
            const {title, content, status}=await request.json();
            let task= await Task.findById(taskId);
            
            (task.title=title),
            (task.content=content),
            (task.status=status)

           const updatedTask= await task.save();

           return NextResponse.json(updatedTask);
        } catch (error) {

            console.log(error);

            return getResponseMessage("Error in updating data", false, 500)
            
        }
};

export async function DELETE(request, { params }){
        try {
            const { taskId } = params;
            await Task.deleteOne({
                _id:taskId
        });
        return getResponseMessage("Task has been deleted", true, 200);
            
        } catch (error) {

            console.log(error);

            return getResponseMessage("Error in updating data", false, 500)
            
        }

};