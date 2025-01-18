import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImagePlus, Library } from "lucide-react";

interface SourceImage {
  id: string;
  url: string;
  name: string;
}

interface SourceSelectorProps {
  onSourceSelect?: (images: SourceImage[]) => void;
  selectedImages?: SourceImage[];
}

const defaultLibraryImages: SourceImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    name: "Nature 1",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7c8f1b",
    name: "Nature 2",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
    name: "Nature 3",
  },
];

const SourceSelector: React.FC<SourceSelectorProps> = ({
  onSourceSelect = () => {},
  selectedImages = [],
}) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop here
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-black/20 rounded-lg overflow-hidden">
      <Tabs defaultValue="upload" className="w-full h-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
            value="upload"
            onClick={() => setActiveTab("upload")}
            className="data-[state=active]:bg-white/10"
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger
            value="library"
            onClick={() => setActiveTab("library")}
            className="data-[state=active]:bg-white/10"
          >
            <Library className="mr-2 h-4 w-4" />
            Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="h-[calc(100%-48px)] p-4">
          <div
            className={`h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors
              ${dragActive ? "border-purple-500 bg-purple-500/10" : "border-white/20"}
              ${activeTab === "upload" ? "cursor-pointer" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <ImagePlus className="h-12 w-12 text-white/60 mb-4" />
            <p className="text-lg font-medium text-white mb-2">
              Drag and drop your photos here
            </p>
            <p className="text-sm text-white/60 mb-4">or</p>
            <Button variant="secondary">Browse Files</Button>
          </div>
        </TabsContent>

        <TabsContent value="library" className="h-[calc(100%-48px)]">
          <ScrollArea className="h-full p-4">
            <div className="grid grid-cols-2 gap-4">
              {defaultLibraryImages.map((image) => (
                <Card
                  key={image.id}
                  className="overflow-hidden bg-black/20 border-white/10"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative group">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                        <Button
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourceSelector;
