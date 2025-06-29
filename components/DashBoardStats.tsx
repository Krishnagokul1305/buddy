import { notesService } from "@/services/notes.service";
import { FileText, Lock, Users, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

async function DashBoardStats({ userId }: { userId: number }) {
  const data = await notesService.getNoteStats(userId);
  const stats = [
    {
      title: "Total Notes",
      value: data.totalNotes,
      description: "All your notes",
      icon: FileText,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
      hoverBg: "group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50",
    },
    {
      title: "Private Notes",
      value: data.privateNotes,
      description: "Only visible to you",
      icon: Lock,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
      hoverBg: "group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50",
    },
    {
      title: "Public Notes",
      value: data.publicNotes,
      description: "Visible to everyone",
      icon: Eye,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
      hoverBg: "group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50",
    },
    {
      title: "Shared to Me",
      value: data.sharedToMe,
      description: "Notes others shared",
      icon: Users,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/50",
      hoverBg: "group-hover:bg-rose-100 dark:group-hover:bg-rose-900/50",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden border border-border backdrop-blur-sm bg-accent/50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2.5 rounded-lg ${stat.bgColor} ${stat.hoverBg} transition-colors duration-300`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${stat.color} transition-colors duration-300`}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground transition-colors duration-300">
                    {stat.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <span className="text-3xl ms-5 font-bold text-foreground transition-colors duration-300">
                {stat.value}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground transition-colors duration-300">
              {stat.description}
            </p>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DashBoardStats;
