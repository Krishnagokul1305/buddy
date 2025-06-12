"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Upload,
  ChevronDown,
  MoreHorizontal,
  FileText,
  ImageIcon,
  Music,
  Video,
  Folder,
  Grid3X3,
  List,
  ChevronRight,
  File,
  Smartphone,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: "pdf" | "image" | "mp3" | "mp4" | "folder" | "jpg" | "mkv";
  size: string;
  items?: number;
  date: string;
  owner?: string;
  isFolder?: boolean;
}

export default function CloudPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const myCloudFiles: FileItem[] = [
    {
      id: "1",
      name: "Portfolio.pdf",
      type: "pdf",
      size: "179 MB",
      items: 1,
      date: "Apr 2022",
    },
    {
      id: "2",
      name: "Rroduct Design.pdf",
      type: "pdf",
      size: "15 MB",
      items: 1,
      date: "Feb 2022",
    },
    {
      id: "3",
      name: "Cry Wolf.mp3",
      type: "mp3",
      size: "12 MB",
      items: 1,
      date: "Feb 2022",
    },
    {
      id: "4",
      name: "Image",
      type: "folder",
      size: "3.5 GB",
      items: 198,
      date: "Feb 2022",
      isFolder: true,
    },
    {
      id: "5",
      name: "Pulp Fiction.mkv",
      type: "mkv",
      size: "1.2 GB",
      items: 1,
      date: "Feb 2022",
    },
    {
      id: "6",
      name: "Visual Design.jpg",
      type: "jpg",
      size: "1 MB",
      items: 1,
      date: "Feb 2022",
    },
  ];

  const recentFiles: FileItem[] = [
    {
      id: "r1",
      name: "Design.pdf",
      type: "pdf",
      size: "25 MB",
      date: "10 Feb 2022",
      owner: "me",
    },
    {
      id: "r2",
      name: "Design Thinking.jpg",
      type: "jpg",
      size: "25 MB",
      date: "10 Feb 2022",
      owner: "me",
    },
    {
      id: "r3",
      name: "The Sopranos S03E12.mkv",
      type: "mkv",
      size: "350 MB",
      date: "19 Feb 2022",
      owner: "me",
    },
    {
      id: "r4",
      name: "The Sopranos S03E13.mkv",
      type: "mkv",
      size: "350 MB",
      date: "19 Feb 2022",
      owner: "me",
    },
  ];

  const getFileIcon = (type: string, isFolder?: boolean) => {
    if (isFolder) return <Folder className="h-8 w-8 text-blue-500" />;

    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "jpg":
      case "image":
        return <ImageIcon className="h-8 w-8 text-purple-500" />;
      case "mp3":
        return <Music className="h-8 w-8 text-yellow-500" />;
      case "mp4":
      case "mkv":
        return <Video className="h-8 w-8 text-red-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getSmallFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "jpg":
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "mp3":
        return <Music className="h-4 w-4 text-yellow-500" />;
      case "mp4":
      case "mkv":
        return <Video className="h-4 w-4 text-red-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* My Cloud Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Files</h2>
                <Button variant="ghost">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myCloudFiles.map((file) => (
                  <Card key={file.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        {getFileIcon(file.type, file.isFolder)}
                      </div>
                      <h3 className="font-medium  mb-1">{file.name}</h3>
                      <p className="text-sm ">
                        {file.size} • {file.items}{" "}
                        {file.items === 1 ? "item" : "items"} • {file.date}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Upload Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold ">Recent Upload</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Storage Usage */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium ">Storage</h3>
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 via-blue-500 via-yellow-500 to-blue-600 w-4/5"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">25.4 GB of 30 GB used</p>
              </CardContent>
            </Card>

            {/* Secure Cloud Storage Promo */}
            <Card className="bg-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Secure Cloud Storage
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  All the encrypted storage you need. Includes HiCloud Transfer,
                  Backup, and eSignatures at no extra cost.
                </p>
                <Button className="w-full  text-blue-600 hover:bg-gray-100">
                  Upgrade Plan
                </Button>
              </CardContent>
            </Card>

            {/* File Categories */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3  rounded-lg border hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Video className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <div className="font-medium ">Video</div>
                    <div className="text-sm text-gray-500">
                      4.19 GB • 57 items
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3  rounded-lg border hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium ">Photo</div>
                    <div className="text-sm text-gray-500">
                      2.19 GB • 270 items
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3  rounded-lg border hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Music className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium ">Music</div>
                    <div className="text-sm text-gray-500">
                      3.2 GB • 145 items
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3  rounded-lg border hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium ">Document</div>
                    <div className="text-sm text-gray-500">
                      14.13 MB • 131 items
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3  rounded-lg border hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium ">Apps</div>
                    <div className="text-sm text-gray-500">0 GB • 0 items</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* Search Bar */
}
//   <div className="flex-1 max-w-md mx-8">
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//       <Input
//         placeholder="Search in HiCloud"
//         className="pl-10 bg-gray-50 border-gray-200 rounded-full"
//       />
//     </div>
//   </div>

//    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
//       <Upload className="h-4 w-4 mr-2" />
//       Upload Files
//     </Button>
