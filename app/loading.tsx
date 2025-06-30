import { FileText } from "lucide-react";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-muted-foreground/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-primary/30 animate-spin" />
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">NotesBuddy</h1>
        </div>
      </div>
    </div>
  );
}

export default Loading;
