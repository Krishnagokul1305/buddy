"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ArrowLeft, User, GraduationCap, Github, Linkedin, UserPlus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { userService } from "@/services/user.service"
import type { RegisterUserData } from "@/types/user"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("personal")

  // Form state
  const [formData, setFormData] = useState<RegisterUserData>({
    // Personal details
    username: "",
    email: "",
    password_hash: "",
    name: "",
    phone: "",
    bio: "",

    // Academic details
    college_name: "",
    year_of_study: "",
    degree: "",
    branch: "",

    // Social media
    github_username: "",
    leetcode_username: "",
    linkedin_username: "",
    resume_link: "",
    profile_picture: "",

    is_verified: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await userService.registerUser(formData)

      if (success) {
        router.push("/login")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "personal") setActiveTab("academic")
    else if (activeTab === "academic") setActiveTab("social")
  }

  const prevTab = () => {
    if (activeTab === "social") setActiveTab("academic")
    else if (activeTab === "academic") setActiveTab("personal")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl animate-fade-in">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </Link>
          <ThemeToggleEnhanced />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <Card className="w-full max-w-2xl animate-scale-in card-hover">
          <CardHeader className="space-y-1">
            <div className="w-full flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-in">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">Join PlacementBuddy to start your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 text-sm text-white bg-destructive rounded animate-shake">{error}</div>}

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 animate-fade-in">
                  <TabsTrigger
                    value="personal"
                    className="flex items-center gap-2 data-[state=active]:animate-bounce-in"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Personal Details</span>
                    <span className="sm:hidden">Personal</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="academic"
                    className="flex items-center gap-2 data-[state=active]:animate-bounce-in"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">Academic Details</span>
                    <span className="sm:hidden">Academic</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:animate-bounce-in">
                    <Github className="h-4 w-4" />
                    <span className="hidden sm:inline">Social Media</span>
                    <span className="sm:hidden">Social</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 pt-4 tab-transition animate-fade-in">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 animate-slide-up stagger-1">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="form-field-animation"
                      />
                    </div>
                    <div className="space-y-2 animate-slide-up stagger-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-field-animation"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-field-animation"
                    />
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-4">
                    <Label htmlFor="password_hash">Password</Label>
                    <Input
                      id="password_hash"
                      name="password_hash"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password_hash}
                      onChange={handleChange}
                      required
                      className="form-field-animation"
                    />
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-field-animation"
                    />
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="form-field-animation"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextTab} className="btn-hover-effect animate-fade-in">
                      Next
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4 pt-4 tab-transition animate-fade-in">
                  <div className="space-y-2 animate-slide-up stagger-1">
                    <Label htmlFor="college_name">College Name</Label>
                    <Input
                      id="college_name"
                      name="college_name"
                      placeholder="ABC University"
                      value={formData.college_name}
                      onChange={handleChange}
                      required
                      className="form-field-animation"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 animate-slide-up stagger-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Select value={formData.degree} onValueChange={(value) => handleSelectChange("degree", value)}>
                        <SelectTrigger id="degree" className="form-field-animation">
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent className="animate-scale-in">
                          <SelectItem value="B.Tech">B.Tech</SelectItem>
                          <SelectItem value="B.E.">B.E.</SelectItem>
                          <SelectItem value="M.Tech">M.Tech</SelectItem>
                          <SelectItem value="BCA">BCA</SelectItem>
                          <SelectItem value="MCA">MCA</SelectItem>
                          <SelectItem value="B.Sc">B.Sc</SelectItem>
                          <SelectItem value="M.Sc">M.Sc</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 animate-slide-up stagger-3">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        name="branch"
                        placeholder="Computer Science"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                        className="form-field-animation"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-4">
                    <Label htmlFor="year_of_study">Year of Study</Label>
                    <Select
                      value={formData.year_of_study}
                      onValueChange={(value) => handleSelectChange("year_of_study", value)}
                    >
                      <SelectTrigger id="year_of_study" className="form-field-animation">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="animate-scale-in">
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="5">5th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between animate-fade-in stagger-5">
                    <Button type="button" variant="outline" onClick={prevTab} className="btn-hover-effect">
                      Previous
                    </Button>
                    <Button type="button" onClick={nextTab} className="btn-hover-effect">
                      Next
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4 pt-4 tab-transition animate-fade-in">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 animate-slide-up stagger-1">
                      <Label htmlFor="github_username" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Username
                      </Label>
                      <Input
                        id="github_username"
                        name="github_username"
                        placeholder="johndoe"
                        value={formData.github_username}
                        onChange={handleChange}
                        className="form-field-animation"
                      />
                    </div>

                    <div className="space-y-2 animate-slide-up stagger-2">
                      <Label htmlFor="leetcode_username" className="flex items-center gap-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
                        </svg>
                        LeetCode Username
                      </Label>
                      <Input
                        id="leetcode_username"
                        name="leetcode_username"
                        placeholder="johndoe"
                        value={formData.leetcode_username}
                        onChange={handleChange}
                        className="form-field-animation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2 animate-slide-up stagger-3">
                      <Label htmlFor="linkedin_username" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn Username
                      </Label>
                      <Input
                        id="linkedin_username"
                        name="linkedin_username"
                        placeholder="johndoe"
                        value={formData.linkedin_username}
                        onChange={handleChange}
                        className="form-field-animation"
                      />
                    </div>

                    <div className="space-y-2 animate-slide-up stagger-4">
                      <Label htmlFor="resume_link">Resume Link</Label>
                      <Input
                        id="resume_link"
                        name="resume_link"
                        placeholder="https://example.com/resume.pdf"
                        value={formData.resume_link}
                        onChange={handleChange}
                        className="form-field-animation"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 animate-slide-up stagger-5">
                    <Label htmlFor="profile_picture">Profile Picture URL</Label>
                    <Input
                      id="profile_picture"
                      name="profile_picture"
                      placeholder="https://example.com/profile.jpg"
                      value={formData.profile_picture}
                      onChange={handleChange}
                      className="form-field-animation"
                    />
                  </div>

                  <div className="flex justify-between animate-fade-in">
                    <Button type="button" variant="outline" onClick={prevTab} className="btn-hover-effect">
                      Previous
                    </Button>
                    <Button type="submit" disabled={isLoading} className="btn-hover-effect">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Registering...
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground animate-fade-in">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </div>
            <Link
              href="/"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground animate-fade-in"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
