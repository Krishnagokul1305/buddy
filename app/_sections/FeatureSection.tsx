"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Users, Cloud, Zap, Shield, Search, Edit3 } from "lucide-react";

function FeatureSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create & Share
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From rich text editing to secure file storage, we've got all the
            tools you need to organize and share your knowledge.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Edit3,
              title: "Rich Text Editor",
              description:
                "Create beautiful notes with markdown support, syntax highlighting, and collaborative editing features.",
              color: "blue",
            },
            {
              icon: Cloud,
              title: "Cloud Storage",
              description:
                "Store unlimited files securely in the cloud with automatic sync across all your devices.",
              color: "indigo",
            },
            {
              icon: Share2,
              title: "Easy Sharing",
              description:
                "Share notes and files with anyone using secure links, permissions, and collaboration tools.",
              color: "green",
            },
            {
              icon: Search,
              title: "Smart Search",
              description:
                "Find anything instantly with our powerful search that works across all your notes and files.",
              color: "orange",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description:
                "Work together in real-time with your team, leave comments, and track changes seamlessly.",
              color: "pink",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description:
                "Your data is protected with end-to-end encryption and enterprise-grade security measures.",
              color: "purple",
            },
          ].map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg h-full">
                <CardContent className="p-8">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-${feature.color}-100 dark:bg-${feature.color}-900/20 mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon
                      className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureSection;
