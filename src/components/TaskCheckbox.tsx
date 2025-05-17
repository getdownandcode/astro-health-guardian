
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { toggleTaskCompletion } from "@/services/mockData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskCheckboxProps {
  astronautId: string;
  taskId: string;
  title: string;
  description?: string;
  completed: boolean;
  disabled?: boolean;
}

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  astronautId,
  taskId,
  title,
  description,
  completed,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <div 
      className="flex items-center space-x-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          {description && (
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TaskCheckbox;
