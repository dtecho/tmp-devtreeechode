import React, { useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  connections: string[];
}

interface NeuralPanelProps {
  nodes?: Node[];
  activeNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
}

const NeuralPanel = ({
  nodes = [
    { id: "1", x: 100, y: 100, connections: ["2", "3"] },
    { id: "2", x: 200, y: 150, connections: ["1"] },
    { id: "3", x: 150, y: 200, connections: ["1"] },
  ],
  activeNodeId = "1",
  onNodeClick = () => {},
}: NeuralPanelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = "rgba(74, 222, 128, 0.2)";
    ctx.lineWidth = 2;

    nodes.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = nodes.find((n) => n.id === targetId);
        if (target) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      });
    });
  }, [nodes]);

  return (
    <Card className="w-full h-full bg-zinc-950 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        width={612}
        height={982}
        className="absolute top-0 left-0 w-full h-full"
      />
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className={`absolute w-4 h-4 rounded-full cursor-pointer
            ${node.id === activeNodeId ? "bg-green-400" : "bg-green-600"}
            hover:bg-green-300 transition-colors`}
          style={{
            left: node.x - 8,
            top: node.y - 8,
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onNodeClick(node.id)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            className={`absolute w-full h-full rounded-full bg-green-400 opacity-30
              ${node.id === activeNodeId ? "scale-150" : "scale-100"}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}
    </Card>
  );
};

export default NeuralPanel;
