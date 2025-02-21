import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ChevronLeft, ChevronRight, Code, MessageSquare } from "lucide-react";

interface ConversationItem {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  type: "chat" | "code";
}

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
}

interface ContextSidebarProps {
  conversations?: ConversationItem[];
  codeSnippets?: CodeSnippet[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const ContextSidebar = ({
  conversations = [
    {
      id: "1",
      title: "React Components Discussion",
      timestamp: "2 hours ago",
      preview: "Let's talk about component architecture...",
      type: "chat",
    },
    {
      id: "2",
      title: "API Integration",
      timestamp: "1 day ago",
      preview: "How to handle authentication...",
      type: "chat",
    },
  ],
  codeSnippets = [
    {
      id: "1",
      title: "Auth Middleware",
      language: "typescript",
      code: "const auth = () => { /* ... */ }",
    },
    {
      id: "2",
      title: "API Helper",
      language: "typescript",
      code: "const fetchData = async () => { /* ... */ }",
    },
  ],
  isExpanded = true,
  onToggle = () => {},
}: ContextSidebarProps) => {
  const [activeTab, setActiveTab] = useState<"conversations" | "snippets">(
    "conversations",
  );

  return (
    <Card
      className={`h-full bg-zinc-950 text-white transition-all duration-300 ${isExpanded ? "w-[300px]" : "w-[60px]"}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          {isExpanded && <h2 className="text-lg font-semibold">Context</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-zinc-400 hover:text-white"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        {isExpanded && (
          <div className="flex gap-2 p-2 border-b border-zinc-800">
            <Button
              variant={activeTab === "conversations" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("conversations")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chats
            </Button>
            <Button
              variant={activeTab === "snippets" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("snippets")}
            >
              <Code className="w-4 h-4 mr-2" />
              Snippets
            </Button>
          </div>
        )}

        <ScrollArea className="flex-1">
          {isExpanded && activeTab === "conversations" && (
            <div className="p-4 space-y-4">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{conv.title}</h3>
                    <span className="text-xs text-zinc-400">
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mt-1 truncate">
                    {conv.preview}
                  </p>
                </div>
              ))}
            </div>
          )}

          {isExpanded && activeTab === "snippets" && (
            <div className="p-4 space-y-4">
              {codeSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-3 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{snippet.title}</h3>
                    <span className="text-xs text-zinc-400">
                      {snippet.language}
                    </span>
                  </div>
                  <pre className="text-sm text-zinc-400 mt-1 truncate">
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
};

export default ContextSidebar;
