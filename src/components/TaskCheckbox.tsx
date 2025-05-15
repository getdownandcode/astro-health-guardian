
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { toggleTaskCompletion } from "@/services/mockData";

interface TaskCheckboxProps {
  astronautId: string;
  taskId: string;
  title: string;
  completed: boolean;
  disabled?: boolean;
}

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  astronautId,
  taskId,
  title,
  completed,
  disabled = false
}) => {
  const handleChange = () => {
    const success = toggleTaskCompletion(astronautId, taskId);
    
    if (success) {
      toast({
        title: completed ? "Task marked as incomplete" : "Task completed",
        description: title,
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={`task-${taskId}`} 
        checked={completed} 
        onCheckedChange={handleChange}
        disabled={disabled}
      />
      <label
        htmlFor={`task-${taskId}`}
        className={`text-sm cursor-pointer ${completed ? "line-through text-muted-foreground" : ""}`}
      >
        {title}
      </label>
    </div>
  );
};

export default TaskCheckbox;
