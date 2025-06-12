"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  AlertTriangle,
  Download,
  Trash2,
  FileArchive,
  FileText,
  ImageIcon,
  Music,
  Video,
  File,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  extension: string;
  file: File;
}

export default function FileUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Helper function to get file type and extension
  const getFileInfo = (file: File) => {
    const extension = "." + file.name.split(".").pop()?.toLowerCase() || "";
    const type = file.type.split("/")[0] || "file";
    return { extension, type };
  };

  // Helper function to get file icon
  const getFileIcon = (type: string, extension: string) => {
    if (
      extension.includes("zip") ||
      extension.includes("rar") ||
      extension.includes("7z")
    ) {
      return <FileArchive className="h-5 w-5 text-white" />;
    }

    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-white" />;
      case "video":
        return <Video className="h-5 w-5 text-white" />;
      case "audio":
        return <Music className="h-5 w-5 text-white" />;
      case "application":
        if (extension.includes("pdf")) {
          return <FileText className="h-5 w-5 text-white" />;
        }
        return <File className="h-5 w-5 text-white" />;
      case "text":
        return <FileText className="h-5 w-5 text-white" />;
      default:
        return <File className="h-5 w-5 text-white" />;
    }
  };

  // Helper function to get file icon background color
  const getFileIconColor = (type: string, extension: string) => {
    if (
      extension.includes("zip") ||
      extension.includes("rar") ||
      extension.includes("7z")
    ) {
      return "bg-blue-600";
    }

    switch (type) {
      case "image":
        return "bg-green-600";
      case "video":
        return "bg-red-600";
      case "audio":
        return "bg-purple-600";
      case "application":
        if (extension.includes("pdf")) {
          return "bg-red-600";
        }
        return "bg-gray-600";
      case "text":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  // Process files and add to state
  const processFiles = useCallback((files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => {
      const { extension, type } = getFileInfo(file);
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension from display name
        size: formatFileSize(file.size),
        type: type,
        extension: extension,
        file: file,
      };
    });

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);

      // Filter files by size (10MB limit)
      const validFiles = files.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        processFiles(validFiles);
      }
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      // Filter files by size (10MB limit)
      const validFiles = files.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        processFiles(validFiles);
      }

      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [processFiles]
  );

  const handleDownload = (fileId: string) => {
    const file = uploadedFiles.find((f) => f.id === fileId);
    if (file) {
      // Create download link
      const url = URL.createObjectURL(file.file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name + file.extension;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (fileId: string) => {
    setUploadedFiles((files) => files.filter((file) => file.id !== fileId));
  };

  const handleRemoveFromTask = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-7 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="*/*"
        />

        <div className="space-y-4">
          <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>

          <div className="text-gray-600">
            <span>Drag & drop or </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              browse file
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <span>Max file size : 10MB</span>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center relative ${getFileIconColor(
                        file.type,
                        file.extension
                      )}`}
                    >
                      {getFileIcon(file.type, file.extension)}
                    </div>
                    <div>
                      <h4 className="font-medium ">{file.name}</h4>
                      <p className="text-sm">
                        {file.extension} | {file.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleDownload(file.id)}
                      className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(file.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Remove from Task Button */}
      {uploadedFiles.length > 0 && (
        <Button
          variant="outline"
          onClick={handleRemoveFromTask}
          className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          Remove file download from this task
        </Button>
      )}
    </div>
  );
}
