import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PreviewPanel from "./mosaic/PreviewPanel";
import SourceSelector from "./mosaic/SourceSelector";
import { Sparkles, Wand2, PanelLeftClose, PanelLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedImage(
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
      );
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          collapsible
          collapsedSize={5}
          onCollapse={() => setIsSidebarCollapsed(true)}
          onExpand={() => setIsSidebarCollapsed(false)}
        >
          <div className="h-screen p-4 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Source Files</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-white hover:bg-white/10"
              >
                {isSidebarCollapsed ? (
                  <PanelLeft className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </Button>
            </div>
            <SourceSelector />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={75}>
          <div className="h-screen p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                  <h1 className="text-5xl font-bold text-white mb-4">
                    AI Image Generator
                  </h1>
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                </div>
                <p className="text-xl text-gray-300">
                  Transform your imagination into reality with AI
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex gap-2 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                  <Input
                    placeholder="Describe your imagination..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 bg-white/10 border-0 text-white placeholder:text-gray-400 focus-visible:ring-purple-500"
                  />
                  <Button
                    onClick={handleGenerate}
                    disabled={!prompt || isGenerating}
                    className="w-32 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Creating..." : "Create"}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <PreviewPanel
                  imageUrl={generatedImage}
                  isLoading={isGenerating}
                />
              </motion.div>
            </motion.div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Home;
