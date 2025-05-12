"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

export function ApiUrlConfig() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiUrl, setApiUrl] = useState(API_BASE_URL)

  const handleSave = () => {
    // In a real app, you would update the environment variable or config
    // For now, we'll just store it in localStorage
    localStorage.setItem("api_base_url", apiUrl)

    // Reload the page to apply the new API URL
    window.location.reload()

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">API Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>API Configuration</DialogTitle>
          <DialogDescription>Set the base URL for API requests. This will be used for all API calls.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-url" className="text-right">
              API URL
            </Label>
            <Input
              id="api-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="http://127.0.0.1:3000"
              className="col-span-3"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Current API URL: {API_BASE_URL}</p>
            <p className="mt-2">Note: Changing this will reload the page and all API requests will use the new URL.</p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
