import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Plus } from "lucide-react";
import CodeBlock from "./CodeBlock";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  code?: {
    language: string;
    content: string;
  };
}

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const ChatInterface = ({
  messages = [
    {
      id: "1",
      type: "assistant",
      content: "Hello! How can I help you with your coding today?",
    },
    {
      id: "2",
      type: "user",
      content: "Can you show me an example of a React component?",
    },
    {
      id: "3",
      type: "assistant",
      content: "Here's a simple React component example:",
      code: {
        language: "typescript",
        content: `import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};`,
      },
    },
  ],
  onSendMessage = (message: string) => console.log("Message sent:", message),
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[900px] bg-zinc-900 text-white">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${message.type === "user" ? "bg-blue-600" : "bg-zinc-800"}`}
              >
                <p className="text-sm">{message.content}</p>
                {message.code && (
                  <div className="mt-4">
                    <CodeBlock
                      code={message.code.content}
                      language={message.code.language}
                      title="Code Example"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-800">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => console.log("Add attachment")}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex gap-2">
            <Input
              className="flex-1 bg-zinc-800 border-zinc-700"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
