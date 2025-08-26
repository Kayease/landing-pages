"use client";

import React from "react";

import { Poppins } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CosmicLoading } from "@/components/cosmic-loading";
import { NormalCursor } from "@/components/normal-cursor";
import { PerformanceOptimizer } from "@/components/performance-optimizer";
import { VideoPreloader } from "@/components/video-preloader";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/contexts/ToastContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // Show cosmic loading while checking authentication
  if (isLoading) {
    return <CosmicLoading />;
  }

  return (
    <>
      {
        <>
          <PerformanceOptimizer />
          <VideoPreloader />
          <NormalCursor />
          <CosmicLoading />
          <Navigation />
        </>
      }

      <main>{children}</main>

      {<Footer />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${poppins.variable} font-poppins`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <LayoutContent>{children}</LayoutContent>
          </ToastProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#fff",
                color: "#333",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
              success: {
                style: {
                  border: "1px solid #10b981",
                },
              },
              error: {
                style: {
                  border: "1px solid #ef4444",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
