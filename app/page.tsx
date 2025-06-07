"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Star,
  Users,
  TrendingUp,
  Github,
  Linkedin,
  Target,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative  min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl animate-pulse" />
            <div className="absolute top-3/4 right-1/4 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl animate-pulse [animation-delay:2s]" />
            <div className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-pink-200/30 blur-2xl animate-pulse [animation-delay:4s]" />
          </div> */}

          <div className="container relative z-10 px-4 md:px-6 mt-5 md:mt-0">
            <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16 items-center">
              <div
                className={`space-y-8 transition-all duration-1000 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Your Career Journey Starts Here
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                    Land Your{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Dream Job
                    </span>{" "}
                    with Confidence
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Transform your placement preparation with our comprehensive
                    platform. Track progress, organize resources, and connect
                    with opportunities that matter.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-6 text-lg border-2"
                    >
                      Login
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Join 10,000+ students
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`relative  md:p-0 p-2 transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="relative md:mb-0 mb-7">
                  {/* Main Dashboard Mockup */}
                  <div className="relative z-10 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-white/30" />
                        <div className="h-3 w-3 rounded-full bg-white/30" />
                        <div className="h-3 w-3 rounded-full bg-white/30" />
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                        <div className="space-y-1">
                          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <div className="h-8 w-8 rounded bg-blue-200 dark:bg-blue-800 mb-2" />
                          <div className="h-3 w-16 bg-blue-300 dark:bg-blue-700 rounded" />
                        </div>
                        <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                          <div className="h-8 w-8 rounded bg-purple-200 dark:bg-purple-800 mb-2" />
                          <div className="h-3 w-16 bg-purple-300 dark:bg-purple-700 rounded" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded" />
                        <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
                        <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-800 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 z-10 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border animate-bounce">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="absolute z-20 -bottom-4 -left-4 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border animate-bounce">
                    <Target className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Students" },
                { number: "95%", label: "Placement Rate" },
                { number: "500+", label: "Partner Companies" },
                { number: "4.9★", label: "User Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                Powerful Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools and resources
                you need to excel in your placement journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: GraduationCap,
                  title: "Smart Profile Management",
                  description:
                    "Create a comprehensive profile that showcases your skills, projects, and achievements to potential employers.",
                  color: "blue",
                },
                {
                  icon: BookOpen,
                  title: "Interactive Notes & Resources",
                  description:
                    "Organize your study materials with markdown support, code highlighting, and collaborative features.",
                  color: "purple",
                },
                {
                  icon: Github,
                  title: "Social Integration",
                  description:
                    "Connect your GitHub, LeetCode, and LinkedIn profiles to showcase your coding skills and professional network.",
                  color: "green",
                },
                {
                  icon: TrendingUp,
                  title: "Progress Analytics",
                  description:
                    "Track your preparation progress with detailed analytics and insights to optimize your study plan.",
                  color: "orange",
                },
                {
                  icon: Users,
                  title: "Community Support",
                  description:
                    "Connect with peers, share experiences, and get guidance from successful alumni and mentors.",
                  color: "pink",
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description:
                    "Your data is protected with enterprise-grade security and privacy controls you can trust.",
                  color: "indigo",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
                >
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/20 mb-4`}
                    >
                      <feature.icon
                        className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                How It{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get started in minutes and transform your placement preparation
                journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection Lines */}

              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description:
                    "Sign up and build your comprehensive profile with academic details, skills, and social links.",
                },
                {
                  step: "02",
                  title: "Organize Resources",
                  description:
                    "Create notes, save resources, and track your preparation progress with our smart tools.",
                },
                {
                  step: "03",
                  title: "Land Your Dream Job",
                  description:
                    "Apply to opportunities, showcase your profile, and get hired by top companies.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl mb-6 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                What Students{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Say
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of successful students who landed their dream
                jobs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Software Engineer at Google",
                  content:
                    "PlacementBuddy helped me organize my entire preparation journey. The profile management and progress tracking features were game-changers!",
                  avatar: "/placeholder.svg?height=60&width=60",
                },
                {
                  name: "Rahul Sharma",
                  role: "Data Scientist at Microsoft",
                  content:
                    "The community support and resource sharing made all the difference. I connected with amazing peers and mentors who guided me throughout.",
                  avatar: "/placeholder.svg?height=60&width=60",
                },
                {
                  name: "Emily Johnson",
                  role: "Product Manager at Amazon",
                  content:
                    "The analytics dashboard helped me identify my weak areas and focus my preparation effectively. Highly recommend to all students!",
                  avatar: "/placeholder.svg?height=60&width=60",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their
              placement journey with PlacementBuddy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black dark:text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PlacementBuddy
                </span>
              </Link>
              <p className="text-muted-foreground">
                Empowering students to achieve their career goals through
                comprehensive placement preparation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link
                  href="/features"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Pricing
                </Link>
                <Link
                  href="/demo"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Demo
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
                <Link
                  href="/careers"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Terms
                </Link>
                <Link
                  href="/security"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} PlacementBuddy. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
