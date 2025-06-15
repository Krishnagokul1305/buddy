"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileText, Share2, Upload, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

function DemoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            See It In{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of seamless note-taking and file management
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-white/30" />
                    <div className="h-3 w-3 rounded-full bg-white/30" />
                    <div className="h-3 w-3 rounded-full bg-white/30" />
                  </div>
                  <span className="text-white font-medium">
                    NotesHub Dashboard
                  </span>
                </div>
              </div>
            </div>

            <div className="md:p-8 py-8 px-6">
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {[
                    {
                      icon: FileText,
                      title: "Create Notes",
                      description: "Rich text editor with markdown support",
                      active: activeFeature === 0,
                    },
                    {
                      icon: UploadCloud,
                      title: "Upload Files",
                      description: "Drag & drop file management",
                      active: activeFeature === 1,
                    },
                    {
                      icon: Share2,
                      title: "Share & Collaborate",
                      description: "Real-time collaboration tools",
                      active: activeFeature === 2,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        item.active
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        scale: item.active ? 1.05 : 1,
                      }}
                    >
                      <motion.div
                        className={`inline-flex p-3 rounded-lg mb-4 ${
                          item.active
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}
                        animate={{
                          rotate: item.active ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="h-6 w-6" />
                      </motion.div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DemoSection;
