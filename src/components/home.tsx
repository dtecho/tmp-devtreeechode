import React, { useState } from "react";
import ChatInterface from "./chat/ChatInterface";
import NeuralPanel from "./visualization/NeuralPanel";
import ContextSidebar from "./context/ContextSidebar";
import QuickActions from "./actions/QuickActions";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-white overflow-hidden">
      <ContextSidebar
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />

      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <ChatInterface />
        </div>

        <div className="w-[612px] flex items-center justify-center">
          <NeuralPanel />
        </div>
      </div>

      <QuickActions position="bottom-right" />
    </div>
  );
};

export default Home;
