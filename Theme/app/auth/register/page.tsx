import { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Join the Cosmic Journey | Theme Demo',
  description: 'Create your account and embark on an extraordinary demo experience'
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 z-0">
        {/* Animated Stars */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Cosmic Nebula Effects */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Shooting Stars */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-20 bg-gradient-to-b from-white to-transparent rounded-full opacity-50 animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
                transform: `rotate(${45 + i * 10}deg)`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${3 + Math.random()}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="text-center">
              {/* Enhanced Logo */}
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin opacity-75 blur-sm"></div>
                <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">B</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Theme Demo
              </h1>
              <p className="text-slate-400 text-lg">Create your account and explore infinite possibilities</p>
            </div>
          </div>

          {/* Register Form Container */}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="bg-white/10 backdrop-blur-xl py-8 px-4 shadow-2xl rounded-2xl border border-white/20 sm:px-10 relative overflow-hidden">
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>

              {/* Form Content */}
              <div className="relative z-10">
                <RegisterForm />
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
              🚀 Your gateway to the cosmos awaits
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}