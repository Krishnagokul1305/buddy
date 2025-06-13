import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  ImageIcon,
  Music,
  Video,
  Folder,
  ChevronRight,
  File,
} from "lucide-react";

export default function CloudPage() {
  const categoryData = [
    {
      name: "Documents",
      files: 64,
      size: "512 MB",
      icon: FileText,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "Pictures",
      files: 1024,
      size: "5.12 GB",
      icon: ImageIcon,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Music",
      files: 32,
      size: "128 MB",
      icon: Music,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      name: "Videos",
      files: 16,
      size: "6.4 GB",
      icon: Video,
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  type FileItem = {
    name: string;
    size: string;
    time: string;
    type: "image" | "zip" | "video" | "audio" | "doc";
  };

  return (
    <div className="min-h-screen p-6 space-y-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div className="left-sidebar space-y-7">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Files</h2>
              <div className="flex items-center gap-2 cursor-pointer">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              {categoryData.map((category, index) => (
                <Card key={index} className={`${category.bgColor} border-0`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}
                      >
                        <category.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{category.files} Files</span>
                      <span>{category.size}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div>
//           <div className="bg-white rounded-lg p-4 w-full space-y-5">
//             <h2 className="text-lg ">Recent Upload</h2>
//             {files.map((file, i) => (
//               <div key={i} className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="bg-gray-100 p-2 rounded-lg">
//                     {fileIcons[file.type]}
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">
//                       {file.name}
//                     </p>
//                     <p className="text-xs text-gray-400">{file.time}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="text-sm text-gray-500">{file.size}</p>
//                   <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

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
