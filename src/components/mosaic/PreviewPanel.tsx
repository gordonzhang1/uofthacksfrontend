import React from "react";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Download, ZoomIn, ZoomOut, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PreviewPanelProps {
  imageUrl?: string;
  isLoading?: boolean;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onDownload?: () => void;
}

const PreviewPanel = ({
  imageUrl,
  isLoading = false,
  onZoomIn = () => {},
  onZoomOut = () => {},
  onDownload = () => {},
}: PreviewPanelProps) => {
  return (
    <Card className="w-full aspect-video flex flex-col overflow-hidden bg-black/20 backdrop-blur-sm border-white/10">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-purple-400" />
          Generated Image
        </h2>
        {imageUrl && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomOut}
              className="h-8 w-8 text-white hover:bg-white/10"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomIn}
              className="h-8 w-8 text-white hover:bg-white/10"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDownload}
              className="h-8 w-8 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Skeleton className="w-64 h-64 rounded-full" />
            </motion.div>
          </div>
        ) : imageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={imageUrl}
              alt="Generated Preview"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
            <ImageIcon className="h-16 w-16 text-gray-500" />
            <p className="text-lg">
              Enter a prompt and click create to generate an image
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PreviewPanel;
