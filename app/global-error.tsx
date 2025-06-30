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
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleReportBug = () => {
    // You can integrate with your bug reporting system here
    const subject = encodeURIComponent("Bug Report: Application Error");
    const body = encodeURIComponent(`
Error Details:
- Message: ${error.message}
- Digest: ${error.digest || "N/A"}
- Timestamp: ${new Date().toISOString()}
- User Agent: ${navigator.userAgent}
- URL: ${window.location.href}

Please describe what you were doing when this error occurred:
    `);
    window.open(`mailto:support@yourapp.com?subject=${subject}&body=${body}`);
  };

  return (
    <html>
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="w-full max-w-2xl mx-auto">
            {/* Main Error Card */}
            <Card className="shadow-lg border-destructive/20">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Oops! Something went wrong
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2">
                  We encountered an unexpected error. Don't worry, our team has
                  been notified and we're working on a fix.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Error Details (Collapsible) */}
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <span className="group-open:rotate-90 transition-transform">
                      ▶
                    </span>
                    Technical Details
                  </summary>
                  <div className="mt-3 p-4 bg-muted rounded-lg border">
                    <div className="space-y-2 text-sm font-mono">
                      <div>
                        <span className="font-semibold text-foreground">
                          Error:
                        </span>
                        <span className="text-destructive ml-2">
                          {error.message}
                        </span>
                      </div>
                      {error.digest && (
                        <div>
                          <span className="font-semibold text-foreground">
                            ID:
                          </span>
                          <span className="text-muted-foreground ml-2">
                            {error.digest}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-foreground">
                          Time:
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {new Date().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </details>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={reset} className="flex-1 gap-2" size="lg">
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={handleReload}
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    size="lg"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reload Page
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    size="lg"
                  >
                    <Home className="w-4 h-4" />
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={handleReportBug}
                    variant="outline"
                    className="flex-1 gap-2 bg-transparent"
                    size="lg"
                  >
                    <Bug className="w-4 h-4" />
                    Report Bug
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-6 bg-muted/50">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <h3 className="font-semibold text-foreground">
                    Need immediate help?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    If this problem persists, please contact our support team
                    with the error ID above.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button variant="link" size="sm" asChild>
                      <a href="mailto:support@yourapp.com">Email Support</a>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <a href="/help" target="_blank" rel="noreferrer">
                        Help Center
                      </a>
                    </Button>
                    <Button variant="link" size="sm" asChild>
                      <a href="/status" target="_blank" rel="noreferrer">
                        System Status
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-xs text-muted-foreground">
              <p>Error occurred at {new Date().toLocaleString()}</p>
              {error.digest && <p>Reference ID: {error.digest}</p>}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
