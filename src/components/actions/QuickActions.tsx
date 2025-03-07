import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Code, FileCode, GitBranch, Plus, Terminal, Wand2 } from "lucide-react";

interface QuickActionsProps {
  onActionSelect?: (action: string) => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const QuickActions = ({
  onActionSelect = (action) => console.log(`Selected action: ${action}`),
  position = "bottom-right",
}: QuickActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: "Generate Code", icon: <Code className="w-4 h-4 mr-2" /> },
    { label: "Create Function", icon: <FileCode className="w-4 h-4 mr-2" /> },
    { label: "Git Operations", icon: <GitBranch className="w-4 h-4 mr-2" /> },
    { label: "Run Command", icon: <Terminal className="w-4 h-4 mr-2" /> },
    { label: "AI Suggestions", icon: <Wand2 className="w-4 h-4 mr-2" /> },
  ];

  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6",
    "bottom-left": "fixed bottom-6 left-6",
    "top-right": "fixed top-6 right-6",
    "top-left": "fixed top-6 left-6",
  };

  return (
    <div className={`${positionClasses[position]} z-50 bg-background`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus
              className={`h-6 w-6 transition-transform duration-200 ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 mt-2 bg-background border border-border"
        >
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              onClick={() => onActionSelect(action.label)}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-accent"
            >
              {action.icon}
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QuickActions;
