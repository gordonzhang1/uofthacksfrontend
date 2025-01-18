import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageUploaderProps {
  onImageUpload?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  defaultImage?: string;
}

const ImageUploader = ({
  onImageUpload = () => {},
  acceptedFileTypes = ["image/jpeg", "image/png", "image/webp"],
  maxFileSize = 5242880, // 5MB
  defaultImage = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000",
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string>(defaultImage);
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("");
      const file = acceptedFiles[0];

      if (file) {
        if (file.size > maxFileSize) {
          setError("File is too large. Maximum size is 5MB.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageUpload(file);
      }
    },
    [maxFileSize, onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, curr) => ({ ...acc, [curr]: [] }),
      {},
    ),
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <Card className="w-full p-6">
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}`}
        >
          <input {...getInputProps()} />

          {preview ? (
            <div className="relative w-full aspect-video">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white">Click or drag to replace image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-1">
                Drag and drop your image here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to select a file
              </p>
              <Button variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Select Image
              </Button>
            </div>
          )}
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <p className="mt-2 text-sm text-gray-500">
          Accepted formats: {acceptedFileTypes.join(", ")} • Max file size:{" "}
          {maxFileSize / 1024 / 1024}MB
        </p>
      </Card>
    </div>
  );
};

export default ImageUploader;
