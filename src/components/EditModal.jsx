import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


function EditModal({ trigger, title, content, status, handleSaveEdit }) {
    const [newtitle, setnewTitle ] = useState(title);
    const [newcontent, setnewContent ] = useState(content);
    const [newstatus, setnewStatus ] = useState(status);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-1 items-center">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" value={newtitle} className="col-span-3" onChange={(e) => {setnewTitle(e.target.value); console.log(newtitle)}} />
          </div>
          <div className="flex  gap-1 items-center">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea id="content" value={newcontent} className="col-span-3 " onChange={(e) => {setnewContent(e.target.value); console.log(newcontent)}} />
          </div>
          <div className="flex  gap-1 items-center">
            <Select onValueChange={(e) =>{ setnewStatus(e); console.log(newstatus)}} value={newstatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>

          <Button type="submit" onClick={() => handleSaveEdit({title: newtitle, content: newcontent, status: newstatus})}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditModal;
