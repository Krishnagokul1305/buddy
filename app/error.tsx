"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page error:", error);
  }, [error]);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground">
              Something went wrong
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We encountered an error while loading this page.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error.message && (
              <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive text-center font-medium">
                  {error.message}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Button onClick={reset} className="w-full gap-2" size="lg">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>

              <Button
                onClick={handleGoBack}
                variant="outline"
                className="gap-2 bg-transparent w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>

            {/* Error ID */}
            {error.digest && (
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Error ID:{" "}
                  <code className="bg-muted px-1 rounded">{error.digest}</code>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
