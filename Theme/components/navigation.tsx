"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu as MenuIcon,
  X,
  Rocket,
  Phone,
  Home,
  Star,
  Info,
  Globe,
  User,
} from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Explore", href: "/explore", icon: Globe },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];


  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/50 shadow-2xl shadow-blue-500/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <motion.div
              className="relative w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              }}
            >
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="h-6 w-6 text-white" />
              </motion.div>

              {/* Simplified orbital ring */}
              <div className="absolute inset-0 border border-white/20 rounded-full" />
            </motion.div>

            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
            >
              <motion.h1
                className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Acme Planetarium
              </motion.h1>
              <motion.p
                className="text-xs text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Journey Through the Cosmos
              </motion.p>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`relative px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                          : "text-slate-300 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{}}
                          transition={{
                            duration: 2,
                            repeat: isActive ? Infinity : 0,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        layoutId={isActive ? "activeTab" : undefined}
                      />

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                          layoutId="activeIndicator"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
            {/* Book Now Button */}
            <a
              href="#book"
              className="ml-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm flex items-center"
            >
              Book Now
            </a>
          </div>

          {/* CTA Buttons - Show different options based on authentication */}
          <motion.div
            className="hidden lg:flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/auth/login">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg border border-blue-500/30 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                  <div className="flex items-center space-x-2 relative z-10">
                    <User className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                    <span>Login</span>
                  </div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="h-6 w-6 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/50"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile menu logo + title (centered) */}
              <div className="flex flex-col items-center justify-center mb-4 text-center">
                <motion.div
                  className="relative w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Rocket className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="absolute inset-0 border border-white/20 rounded-full" />
                </motion.div>
                <motion.h2
                  className="mt-3 text-lg font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Acme Planetarium
                </motion.h2>
              </div>
              <div className="space-y-4">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <motion.div
                          className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                          }`}
                          whileHover={{ scale: 1.02, x: 10 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            animate={isActive ? { rotate: [0, 360] } : {}}
                            transition={{
                              duration: 2,
                              repeat: isActive ? Infinity : 0,
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </motion.div>
                          <span className="font-medium text-lg">
                            {item.name}
                          </span>
                          {isActive && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Star className="h-4 w-4 text-yellow-400 ml-auto" />
                            </motion.div>
                          )}
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Authentication Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-slate-700/50"
                >
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg">
                        <User className="mr-3 h-5 w-5" />
                        Login to Dashboard
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
