'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowRightIcon,
  EnvelopeIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully! You can now log in.');
          toast.success('Email verified successfully! 🎉', {
            duration: 5000,
            icon: '✅',
          });
        } else {
          setStatus('error');
          setMessage(data.message || 'Email verification failed. The link may be invalid or expired.');
          toast.error('Email verification failed', {
            duration: 5000,
            icon: '❌',
          });
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Network error. Please check your connection and try again.');
        toast.error('Network error. Please try again.', {
          duration: 5000,
          icon: '⚠️',
        });
      }
    };

    verifyEmail();
  }, [token]);

  const handleGoToLogin = () => {
    router.push('/auth/login');
  };

  const handleResendVerification = () => {
    router.push('/auth/resend-verification');
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 z-0">
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
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              className="mx-auto h-20 w-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-2xl relative"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(147, 51, 234, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-spin opacity-75 blur-sm"></div>
              <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">B</span>
              </div>
            </motion.div>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Email Verification
            </h1>
            <p className="text-slate-400">Theme Demo Account Verification</p>
          </div>

          {/* Verification Card */}
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
            
            <div className="relative z-10 text-center space-y-6">
              {status === 'loading' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <motion.div
                    className="w-16 h-16 mx-auto relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative">
                      <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                        <EnvelopeIcon className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Verifying Your Cosmic Identity
                    </h3>
                    <p className="text-slate-300">
                      Please wait while we verify your email address...
                    </p>
                  </div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center justify-center space-x-2">
                      <SparklesIcon className="h-5 w-5" />
                      <span>Verification Successful!</span>
                      <SparklesIcon className="h-5 w-5" />
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {message}
                    </p>
                  </div>
                  <motion.button
                    onClick={handleGoToLogin}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Launch into Space</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <XCircleIcon className="h-16 w-16 text-red-400 mx-auto" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">
                      Verification Failed
                    </h3>
                    <p className="text-slate-300 mb-6">
                      {message}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <motion.button
                      onClick={handleResendVerification}
                      className="w-full flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <EnvelopeIcon className="mr-2 h-5 w-5" />
                      Resend Verification Email
                    </motion.button>
                    <motion.button
                      onClick={handleGoToLogin}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Back to Login</span>
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {!token && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <XCircleIcon className="h-16 w-16 text-red-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-400 mb-2">
                      Invalid Link
                    </h3>
                    <p className="text-slate-300 mb-6">
                      This verification link is invalid or malformed.
                    </p>
                  </div>
                  <motion.button
                    onClick={handleGoToLogin}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Back to Login</span>
                    <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}