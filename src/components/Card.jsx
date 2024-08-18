import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast"




const TaskCard = ({
  title,
  content,
  status,
  createdAt,
  id,
  getTasks
}) => {

  const { toast } = useToast();

  const handleDeleteTask = async (taskId=id) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        
        toast({title:"Task Deleted"});
      } else {
        console.log("Failed to Delete Task");
        toast.error("Failed to Delete");
      }
    } catch (error) {
      console.error(error);
    }finally{
      getTasks();
    }
  };

   // function to save changes in db 

   const handleSaveEdit =async (newdata, taskId=id) => {
    
    
    try {
      const updatedTaskData =  {  title: newdata.title, content: newdata.content, status: newdata.status };
      console.log(updatedTaskData);
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });
      if (response.ok) {
        console.log("Task Edited..");
        toast({description:"Task has been edited..."});
        getTasks();
      } else {
        console.log("Failed to save edit");
        toast.error("Something went wrong");
      }
      
    } catch (error) {
      console.error(error);
    }
    
  };

  const toggleCompleted = async (taskId=id) => {
    try {
      // Fetch the existing task data
      const existingTaskResponse = await fetch(`/api/tasks/${taskId}`);
      const existingTaskData = await existingTaskResponse.json();

      const updatedTaskData = {
        ...existingTaskData,
        status: existingTaskData.status === "Pending" ? "Completed" : "Pending",
      };

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (response.ok) {
        console.log("Task Marked Completed");
        toast({title:"Task Status Updated"});
        getTasks();
      } else {
        console.log("Failed to Mark Completed");
        toast.error("Failed Mark Completed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription><span className="mx-3">{status}</span><span>Created on:{formatDate(createdAt)}</span></CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        
        <DeleteModal handleDeleteTask={handleDeleteTask}  trigger="Delete" title="Confirm Deletion" content="Are you sure you want to delete this task permanently?"/>
        <EditModal  handleSaveEdit={handleSaveEdit} title={title} content={content} status={status}/>
        <Button variant="outline" className="mx-3" onClick={() => toggleCompleted()}>{status==="Completed" ? "Mark as Pending" : "Mark as Completed"}</Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
