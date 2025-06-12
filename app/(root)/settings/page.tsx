import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Lock,
  Palette,
  Bell,
  Shield,
  Download,
  Trash2,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import PasswordChangeForm from "@/components/PasswordChangeForm";
import AccountDeleteCard from "@/components/AccountDeleteCard";

export default function SettingsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className=" mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Password Change */}
          <PasswordChangeForm />
          {/* Theme Settings */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Preferences
              </CardTitle>
              <CardDescription>
                Choose your preferred theme for the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${
                    theme === "light" ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setTheme("light")}
                >
                  <CardContent className="p-4 text-center">
                    <Sun className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Light</h3>
                    <p className="text-sm text-gray-600">
                      Clean and bright interface
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all ${
                    theme === "dark" ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setTheme("dark")}
                >
                  <CardContent className="p-4 text-center">
                    <Moon className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Dark</h3>
                    <p className="text-sm text-gray-600">Easy on the eyes</p>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-all ${
                    theme === "system" ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setTheme("system")}
                >
                  <CardContent className="p-4 text-center">
                    <Monitor className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">System</h3>
                    <p className="text-sm text-gray-600">Matches your device</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card> */}

          {/* Security Settings */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your security settings and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {twoFactor && <Badge variant="secondary">Enabled</Badge>}
                  <Switch
                    id="two-factor"
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                  />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Export Your Data</Label>
                  <p className="text-sm text-gray-600">
                    Download a copy of all your data
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* Notification Settings */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Receive updates via email
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">
                      Receive push notifications on your device
                    </p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-gray-600">
                    Receive promotional emails and updates
                  </p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, marketing: checked })
                  }
                />
              </div>
            </CardContent>
          </Card> */}

          {/* Danger Zone */}
          <AccountDeleteCard />
        </div>
      </div>
    </div>
  );
}
