"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Globe,
  Award,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black border-t border-slate-800/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Theme Demo
                </h3>
                <p className="text-xs text-slate-500 font-medium">Since 1962</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              Inspiring minds and igniting curiosity about the cosmos. Join us
              on an extraordinary journey through space, time, and the wonders
              of the universe.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map((social) => (
                <Button
                  key={social.label}
                  size="icon"
                  variant="ghost"
                  className="w-10 h-10 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 group"
                  asChild
                >
                  <Link href={social.href}>
                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "#book", label: "Book Tickets" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-slate-400 hover:text-white transition-all duration-300 text-sm"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 relative">
                Contact Info
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-slate-400 group-hover:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm font-medium">Location</p>
                  <p className="text-slate-500 text-sm mt-1">
                    New Jersey, USA
                    <br />
                    New York, USA 10001
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-slate-400 group-hover:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm font-medium">Phone</p>
                  <p className="text-slate-500 text-sm mt-1">+00 0000 000000</p>
                </div>
              </li>

              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 bg-slate-800/50 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-slate-400 group-hover:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 text-sm font-medium">Email</p>
                  <p className="text-slate-500 text-sm mt-1">
                    info@example.com
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-6 relative">
                Experience
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm font-medium">
                    Award Winning
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  Recognized for excellence in science education and public
                  outreach
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300 text-sm font-medium">
                    Global Reach
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  Serving visitors from around the world with cutting-edge
                  technology
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="#book">
                  Book Your Visit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <span>
                &copy; {new Date().getFullYear()} Kayease Global. All rights
                reserved.
              </span>
            </div>

            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <span>Made with ❤️ by</span>
              <span className="font-semibold text-blue-400">
                <a
                  href="http://kayease.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kayease Global
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
