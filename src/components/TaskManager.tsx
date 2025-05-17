
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, Edit, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { addTask, deleteTask, updateTask } from "@/services/mockData";
import TaskCheckbox from "./TaskCheckbox";
import { Task } from "@/types/astronaut";

interface TaskManagerProps {
  astronautId: string;
  astronautName: string;
  tasks: Record<string, Task>;
}

type TaskFormValues = {
  title: string;
  description?: string;
};

const TaskManager: React.FC<TaskManagerProps> = ({ astronautId, astronautName, tasks }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const addForm = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const editForm = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleAddTask = (data: TaskFormValues) => {
    const success = addTask(astronautId, data.title, data.description || "");
    
    if (success) {
      toast({
        title: "Task added",
        description: `Task "${data.title}" was added to ${astronautName}'s list.`
      });
      addForm.reset();
      setIsAddModalOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditTask = (data: TaskFormValues) => {
    if (!selectedTask) return;

    const success = updateTask(astronautId, selectedTask.id, data.title);
    
    if (success) {
      toast({
        title: "Task updated",
        description: `Task was updated for ${astronautName}.`
      });
      editForm.reset();
      setIsEditModalOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const success = deleteTask(astronautId, taskId);
    
    if (success) {
      toast({
        title: "Task removed",
        description: "Task was removed successfully."
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to remove task. Please try again.",
        variant: "destructive"
      });
    }
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    editForm.setValue("title", task.title);
    editForm.setValue("description", task.description || "");
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Assigned Tasks</h3>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="text-xs flex gap-1">
              <Plus className="h-4 w-4" /> Assign Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign New Task to {astronautName}</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddTask)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter task details" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Assign Task</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border/50 rounded-md p-3 bg-secondary/10">
        {tasks && Object.keys(tasks).length > 0 ? (
          <div className="space-y-3">
            {Object.values(tasks).map((task) => (
              <div key={task.id} className="flex items-center justify-between group border-b border-border/20 pb-2 last:border-0 last:pb-0">
                <TaskCheckbox
                  astronautId={astronautId}
                  taskId={task.id}
                  title={task.title}
                  completed={task.completed}
                />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7" 
                    onClick={() => openEditModal(task)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-2">No tasks assigned</p>
        )}
      </div>

      {/* Edit Task Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditTask)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Task</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskManager;
