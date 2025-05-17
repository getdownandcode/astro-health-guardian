
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { addQuery } from "@/services/mockData";

interface QueryFormProps {
  astronautId: string;
  onQueryAdded?: () => void;
}

const QueryForm: React.FC<QueryFormProps> = ({ astronautId, onQueryAdded }) => {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSubmitting(true);
    
    // Add query to the system
    const success = addQuery(astronautId, query);
    
    if (success) {
      toast({
        title: "Query submitted",
        description: "Your message has been sent to the medical team."
      });
      setQuery("");
      if (onQueryAdded) onQueryAdded();
    } else {
      toast({
        title: "Error",
        description: "Failed to submit your query. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        placeholder="Type your health query here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="min-h-[120px]"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!query.trim() || isSubmitting}
          className="gap-1"
        >
          <Send className="h-4 w-4" />
          Submit Query
        </Button>
      </div>
    </form>
  );
};

export default QueryForm;
