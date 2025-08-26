'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address.');
      toast.error('Please enter your email address.', {
        duration: 3000,
        icon: '⚠️',
      });
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Verification email sent successfully! Please check your inbox.');
        toast.success('Verification email sent successfully! 📧', {
          duration: 6000,
          icon: '✅',
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to send verification email. Please try again.');
        toast.error(data.message || 'Failed to send verification email', {
          duration: 5000,
          icon: '❌',
        });
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
      toast.error('Network error. Please try again.', {
        duration: 5000,
        icon: '⚠️',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Resend Verification Email
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Enter your email to receive a new verification link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === 'success' ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-green-800">
                  Email Sent!
                </h3>
                <p className="text-gray-600">
                  {message}
                </p>
                <p className="text-sm text-gray-500">
                  Don't forget to check your spam folder.
                </p>
              </div>
              <Button 
                onClick={handleBackToLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Verification Email'}
                </Button>
              </form>

              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={handleBackToLogin}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}