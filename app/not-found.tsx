"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <FileQuestion className="w-8 h-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Suggestions */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium text-foreground mb-2">
                What you can do:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Visit our dashboard</li>
                <li>• Search for what you need</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button asChild className="w-full gap-2" size="lg">
                <Link href="/profile">
                  <Home className="w-4 h-4" />
                  Go to Dashboard
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="gap-2 w-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
