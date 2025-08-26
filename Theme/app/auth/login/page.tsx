import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | Theme Demo",
  description: "Secure access to the demo admin portal",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 z-0">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Cosmic Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-bounce"
              style={{
                left: `${10 + i * 4}%`,
                top: `${10 + (i % 8) * 10}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              {/* Enhanced Logo */}
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin opacity-75 blur-sm"></div>
                <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    B
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Theme Demo
              </h1>
              <p className="text-slate-400 text-lg">
                Sign in to explore the universe of possibilities
              </p>
            </div>
          </div>

          {/* Login Form Container */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white/10 backdrop-blur-xl py-8 px-4 shadow-2xl rounded-2xl border border-white/20 sm:px-10 relative overflow-hidden">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>

              {/* Form Content */}
              <div className="relative z-10">
                <LoginForm />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-400">
            <p className="flex items-center justify-center space-x-2">
              <span>© {new Date().getFullYear()} Theme Demo</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>All rights reserved</span>
            </p>
            <p className="mt-2 text-slate-500">
              🌟 Secure cosmic gateway to the stars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
