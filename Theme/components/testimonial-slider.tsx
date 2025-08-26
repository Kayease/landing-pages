/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Teacher",
    content:
      "An absolutely mesmerizing experience! The planetarium shows are educational and visually stunning. My students were captivated throughout the entire presentation.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Parent",
    content:
      "Brought my family here for the weekend and we were blown away. The 'Journey to the Stars' show was incredible. My kids are now obsessed with astronomy!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Dr. Anita Gupta",
    role: "Astronomer",
    content:
      "As a professional in the field, I'm impressed by the scientific accuracy and the quality of the presentations. Highly recommend for anyone interested in space science.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "Arjun Patel",
    role: "Student",
    content:
      "The black hole show was mind-blowing! I never understood these concepts so clearly before. The visual effects made everything so easy to comprehend.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl text-slate-300 mb-6 italic">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </blockquote>
                {/* 
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={
                      testimonials[currentIndex].avatar || "/placeholder.svg"
                    }
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-500" : "bg-slate-600"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
