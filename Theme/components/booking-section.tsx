"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Users,
  Clock,
  // Play,
  Sparkles,
  // Zap,
  // ArrowRight,
  Crown,
  User,
  ChevronLeft,
  ChevronRight,
  Ticket,
  CreditCard,
  CheckCircle,
  // MapPin,
  // Phone,
  Mail,
  CalendarDays,
} from "lucide-react";
import { Label } from "@/components/ui/label";

import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Show {
  id: string;
  title: string;
  description: string;
  main_image: string;
  show_time: string;
  price: number;
  bulk_price: number;
  capacity: number;
  duration: number;
  created_date: string;
}

interface BookingData {
  show: string;
  name: string;
  phone: string;
  email: string;
  quantity: number;
  totalAmount: number;
  selectedDate: string;
}

interface Booking {
  id: string;
  show_id: string;
  quantity: number;
  booking_date: string;
  status: string;
  created_at: string;
}

type BookingStep = "select" | "details" | "preview";

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const planetsRef = useRef<HTMLDivElement[]>([]);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);
  const bookRef = useRef<HTMLDivElement>(null);

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>("select");
  const [isFlipping, setIsFlipping] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    show: "",
    name: "",
    phone: "",
    email: "",
    quantity: 1,
    totalAmount: 0,
    selectedDate: new Date().toISOString().split("T")[0], // Auto-select today
  });
  const [bookedTodayForSelected, setBookedTodayForSelected] =
    useState<number>(0);
  const [isLoadingBookings, setIsLoadingBookings] = useState<boolean>(false);
  const [showDateCalendar, setShowDateCalendar] = useState<boolean>(false);

  // Dark theme styles (permanent)
  const bgGradient = "from-slate-900 via-purple-900/20 to-indigo-900/20";
  const textPrimary = "text-white";
  const textSecondary = "text-slate-300";
  const cardBg = "bg-white/5";
  const cardBorder = "border-white/20";

  // All available planet images for floating elements
  const planetImages = [
    "/Planets/Earth.png",
    "/Planets/Mars.png",
    "/Planets/Venus.png",
    "/Planets/Jupitor.png",
    "/Planets/Saturn.png",
    "/Planets/Saturn-2.png",
    "/Planets/Moon.png",
    "/Planets/Planet-8.png",
    "/Planets/Planet-13.png",
    "/Planets/Orb.png",
    "/Planets/Group 3.png",
    "/Planets/Star2.png",
    "/Planets/Astronaut.png",
  ];

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Floating planets animation
      planetsRef.current.forEach((planet, index) => {
        if (planet) {
          gsap.to(planet, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-180, 180)",
            duration: "random(8, 15)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5,
          });

          // Parallax effect on scroll
          gsap.to(planet, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: (index % 2 === 0 ? -80 : 80) * (index + 1),
            rotation: 180 * (index + 1),
            ease: "none",
          });
        }
      });

      // Floating elements (stars, astronaut, etc.)
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-40, 40)",
            x: "random(-25, 25)",
            rotation: "random(-90, 90)",
            scale: "random(0.8, 1.2)",
            duration: "random(6, 12)",
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3,
          });
        }
      });

      // Book entrance animation
      gsap.fromTo(
        bookRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: -15,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Phone helpers for India (+91) 10-digit mobiles
  const sanitizeIndianPhone = (value: string): string =>
    value.replace(/\D/g, "").slice(0, 10);
  const isValidIndianMobile = (value: string): boolean =>
    /^[6-9]\d{9}$/.test(value);

  // Email validation
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Calculate booked seats for today for a specific selected show
  const calculateBookedForSelectedShow = async (show: Show) => {
    try {
      setIsLoadingBookings(true);

      // Get current date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      // Fetch bookings for this specific show for today
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/bookings/show/${show.id}/date/${today}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch bookings: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const bookings = data.bookings || [];

      // Calculate total booked seats for today
      const totalBookedSeats = bookings.reduce(
        (total: number, booking: Booking) => {
          return total + (booking.quantity || 0);
        },
        0
      );

      setBookedTodayForSelected(totalBookedSeats);
      return totalBookedSeats;
    } catch (error) {
      console.error("Error calculating booked seats for selected show:", error);
      setBookedTodayForSelected(0);
      return 0;
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // Decide per-seat price (single pricing for simplified flow)
  const getPerSeatPrice = (show: Show | null): number => {
    if (!show) return 0;
    return typeof show.price === "number"
      ? show.price
      : Number(show.price) || 0;
  };

  // Load mock shows (disable real API fetching)
  useEffect(() => {
    setLoading(true);
    setError("");

    const mockShows: Show[] = [
      {
        id: "1",
        title: "Journey Through the Cosmos",
        description:
          "Experience the wonders of our universe in this immersive 60-minute journey through space and time.",
        main_image: "/placeholder-show-1.jpg",
        show_time: "60",
        price: 500,
        bulk_price: 450,
        capacity: 100,
        duration: 60,
        created_date: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Stars & Galaxies",
        description:
          "Discover distant galaxies, nebulae, and the life cycle of stars in this breathtaking cosmic adventure.",
        main_image: "/placeholder-show-2.jpg",
        show_time: "45",
        price: 400,
        bulk_price: 360,
        capacity: 80,
        duration: 45,
        created_date: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Solar System Odyssey",
        description:
          "Fly past the planets and explore the beauty and mysteries of our solar neighborhood.",
        main_image: "/placeholder-show-3.jpg",
        show_time: "50",
        price: 450,
        bulk_price: 400,
        capacity: 90,
        duration: 50,
        created_date: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Black Holes Revealed",
        description:
          "Dive into the science of black holes and witness how they warp space and time.",
        main_image: "/placeholder-show-4.jpg",
        show_time: "55",
        price: 550,
        bulk_price: 500,
        capacity: 85,
        duration: 55,
        created_date: new Date().toISOString(),
      },
    ];

    setShows(mockShows);
    setLoading(false);
  }, []);

  // Recalculate booked-today seats when selection changes
  useEffect(() => {
    if (selectedShow) {
      calculateBookedForSelectedShow(selectedShow);
    } else {
      setBookedTodayForSelected(0);
    }
  }, [selectedShow]);

  const updateBookingData = (field: keyof BookingData, value: unknown) => {
    setBookingData((prev) => {
      const updated = { ...prev, [field]: value };

      // Calculate total amount
      if (updated.show && updated.quantity > 0) {
        const show = shows.find((s) => s.id === updated.show);
        if (show) {
          const perTicket = getPerSeatPrice(show);
          updated.totalAmount = perTicket * updated.quantity;
        }
      }

      return updated;
    });
  };

  const handleShowSelect = (showId: string) => {
    const show = shows.find((s) => s.id === showId);
    setSelectedShow(show || null);
    updateBookingData("show", showId);
  };

  // Page flip animation
  const flipToNextPage = (nextStep: BookingStep) => {
    if (isFlipping) return;

    setIsFlipping(true);

    // GSAP page flip animation
    if (bookRef.current) {
      gsap.to(bookRef.current, {
        rotationY: -90,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentStep(nextStep);
          gsap.fromTo(
            bookRef.current,
            { rotationY: 90 },
            {
              rotationY: 0,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => setIsFlipping(false),
            }
          );
        },
      });
    }
  };

  const flipToPrevPage = (prevStep: BookingStep) => {
    if (isFlipping) return;

    setIsFlipping(true);

    if (bookRef.current) {
      gsap.to(bookRef.current, {
        rotationY: 90,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentStep(prevStep);
          gsap.fromTo(
            bookRef.current,
            { rotationY: -90 },
            {
              rotationY: 0,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => setIsFlipping(false),
            }
          );
        },
      });
    }
  };

  const handleNext = () => {
    if (currentStep === "select" && selectedShow && bookingData.selectedDate) {
      flipToNextPage("details");
    } else if (currentStep === "details" && isFormValid()) {
      flipToNextPage("preview");
    }
  };

  const handlePrevious = () => {
    if (currentStep === "details") {
      flipToPrevPage("select");
    } else if (currentStep === "preview") {
      flipToPrevPage("details");
    }
  };

  const isFormValid = () => {
    const availableSeats = selectedShow
      ? selectedShow.capacity - bookedTodayForSelected
      : 0;
    return (
      bookingData.name.trim() !== "" &&
      isValidIndianMobile(bookingData.phone) &&
      isValidEmail(bookingData.email) &&
      bookingData.quantity > 0 &&
      bookingData.quantity <= availableSeats
    );
  };

  const handlePayment = () => {
    // Handle payment logic here
    alert("Redirecting to payment gateway...");
  };

  // Generate dates starting from today (no past dates)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    for (let i = 0; i < 14; i++) {
      // Show 14 days from today
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
        fullLabel: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        isToday: i === 0,
      });
    }
    return dates;
  };

  // Handle date selection from calendar
  const handleDateSelect = (date: string) => {
    updateBookingData("selectedDate", date);
    setShowDateCalendar(false);
  };

  // Get selected date display text
  const getSelectedDateDisplay = () => {
    if (!bookingData.selectedDate) return "Select Date";

    const date = new Date(bookingData.selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
      return "Today";
    }

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      ref={sectionRef}
      className={`min-h-[100svh] bg-gradient-to-br ${bgGradient} relative overflow-hidden booking-section`}
    >
      {/* Enhanced Background Elements with ALL Planet Images */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {/* Floating Planets */}
        {planetImages.slice(0, 8).map((image, index) => (
          <motion.div
            key={`planet-${index}`}
            ref={(el: HTMLDivElement | null): void => {
              if (el) {
                planetsRef.current[index] = el;
              }
            }}
            className={`absolute ${
              index % 4 === 0
                ? "w-16 h-16"
                : index % 4 === 1
                ? "w-12 h-12"
                : index % 4 === 2
                ? "w-20 h-20"
                : "w-14 h-14"
            } opacity-20`}
            style={{
              left: `${5 + ((index * 12) % 85)}%`,
              top: `${10 + ((index * 15) % 80)}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            <Image
              src={image}
              alt={`Planet ${index}`}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}

        {/* Floating Stars and Special Elements */}
        {planetImages.slice(8).map((image, index) => (
          <motion.div
            key={`floating-${index}`}
            ref={(el: HTMLDivElement | null): void => {
              if (el) {
                floatingElementsRef.current[index] = el;
              }
            }}
            className={`absolute ${
              image.includes("Star2")
                ? "w-6 h-6"
                : image.includes("Astronaut")
                ? "w-12 h-15"
                : "w-10 h-10"
            } opacity-15`}
            style={{
              right: `${10 + ((index * 18) % 70)}%`,
              top: `${20 + ((index * 25) % 60)}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, delay: index * 0.3 }}
          >
            <Image
              src={image}
              alt={`Floating ${index}`}
              width={image.includes("Astronaut") ? 48 : 40}
              height={image.includes("Astronaut") ? 60 : 40}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />

        {/* Cosmic Nebula Effects */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`nebula-${i}`}
            className={`absolute w-80 h-80 rounded-full opacity-5`}
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0
                  ? "rgba(168, 85, 247, 0.2)"
                  : "rgba(59, 130, 246, 0.2)"
              } 0%, transparent 70%)`,
              left: `${15 + i * 20}%`,
              top: `${5 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-6 backdrop-blur-sm shadow-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 border border-amber-500/40">
            <Crown className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold tracking-wide text-amber-100">
              Premium Experience
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>

          <h1
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-cosmic leading-tight ${textPrimary} flex items-center justify-center`}
          >
            Book Your
            <span className="block bg-gradient-to-r ml-3 from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Ticket
            </span>
          </h1>
        </motion.div>

        {/* Book-like Booking Interface */}
        <div className="max-w-4xl mx-auto perspective-1000">
          <div
            ref={bookRef}
            className={`${cardBg} backdrop-blur-xl border ${cardBorder} shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden transform-gpu`}
            style={{
              transformStyle: "preserve-3d",
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Book Spine Effect */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-600 to-orange-600
               rounded-l-3xl`}
            />

            <div className="px-4 sm:px-8 py-6 sm:py-12 min-h-[500px] sm:min-h-[600px]">
              {/* Step Indicator - Mobile Responsive */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {[
                    { step: "select", label: "Select", icon: Calendar },
                    { step: "details", label: "Details", icon: User },
                    { step: "preview", label: "Preview", icon: Ticket },
                  ].map(({ step, label, icon: Icon }, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                          currentStep === step
                            ? "bg-amber-500 border-amber-500 text-white"
                            : (currentStep === "details" &&
                                step === "select") ||
                              (currentStep === "preview" &&
                                (step === "select" || step === "details"))
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-slate-600 text-slate-400"
                        }`}
                      >
                        {(currentStep === "details" && step === "select") ||
                        (currentStep === "preview" &&
                          (step === "select" || step === "details")) ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                      <span
                        className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${textSecondary} hidden sm:block`}
                      >
                        {label}
                      </span>
                      {index < 2 && (
                        <div className="w-4 sm:w-6 lg:w-8 h-px mx-1 sm:mx-2 lg:mx-4 bg-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Page 1: Select Date & Show */}
                {currentStep === "select" && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                        Choose Your Experience
                      </h2>
                      <p className={`${textSecondary}`}>
                        Select your preferred date and show
                      </p>
                    </div>

                    {loading ? (
                      <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className={`text-lg ${textSecondary}`}>
                          Loading shows...
                        </p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-16">
                        <p className="text-red-400 text-lg mb-4">
                          Failed to load shows: {error}
                        </p>
                        <Button
                          onClick={() => window.location.reload()}
                          variant="outline"
                        >
                          Try Again
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Date Selection - Mobile Responsive */}
                        <div>
                          <Label
                            className={`text-lg font-semibold mb-4 block ${textPrimary}`}
                          >
                            Select Date
                          </Label>

                          {/* Date Display Box */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setShowDateCalendar(!showDateCalendar)
                            }
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${
                              bookingData.selectedDate
                                ? "bg-blue-500/10 border-blue-500/50 text-blue-300"
                                : "bg-white/5 border-white/20 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <CalendarDays className="h-5 w-5" />
                              <span className="font-medium">
                                {getSelectedDateDisplay()}
                              </span>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </motion.button>

                          {/* Calendar Popup */}
                          <AnimatePresence>
                            {showDateCalendar && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 p-4 rounded-xl border border-white/20 bg-slate-900/90 backdrop-blur-xl"
                              >
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                                  {getAvailableDates().map((date) => (
                                    <motion.button
                                      key={date.value}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleDateSelect(date.value)
                                      }
                                      className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                                        bookingData.selectedDate === date.value
                                          ? "bg-blue-500/20 border-blue-500 text-blue-300"
                                          : date.isToday
                                          ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                          : "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-white/5"
                                      }`}
                                    >
                                      <div className="text-xs font-medium">
                                        {date.label}
                                      </div>
                                      {date.isToday && (
                                        <div className="text-xs text-amber-400 mt-1">
                                          Today
                                        </div>
                                      )}
                                    </motion.button>
                                  ))}
                                </div>

                                {/* Close button */}
                                <div className="mt-4 text-center">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDateCalendar(false)}
                                    className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                                  >
                                    Close
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Show Selection - Mobile Responsive */}
                        <div>
                          <Label
                            className={`text-lg font-semibold mb-4 block ${textPrimary}`}
                          >
                            Select Show
                          </Label>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {shows.map((show) => (
                              <motion.div
                                key={show.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleShowSelect(show.id)}
                                className={`cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                                  selectedShow?.id === show.id
                                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500 shadow-lg"
                                    : "border-slate-600 hover:border-slate-500 hover:bg-white/5"
                                }`}
                              >
                                <div className="p-4 sm:p-6">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <h3
                                        className={`font-bold text-lg sm:text-xl ${textPrimary} mb-1`}
                                      >
                                        {show.title
                                          ? show.title
                                          : show.show_time}
                                      </h3>
                                    </div>
                                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white ml-3 flex-shrink-0">
                                      ₹{show.price}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                                    <span
                                      className={`flex items-center gap-1 ${textSecondary}`}
                                    >
                                      <Clock className="h-4 w-4" />
                                      {show.duration} min
                                    </span>
                                    <span
                                      className={`flex items-center gap-1 ${textSecondary}`}
                                    >
                                      <Users className="h-4 w-4" />
                                      {show.capacity} seats
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Next Button - Mobile Responsive */}
                        <div className="flex justify-center sm:justify-end pt-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto"
                          >
                            <Button
                              onClick={handleNext}
                              disabled={
                                !selectedShow || !bookingData.selectedDate
                              }
                              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold disabled:opacity-50"
                            >
                              Next
                              <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Page 2: Enter Details */}
                {currentStep === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                        Your Details
                      </h2>
                      <p className={`${textSecondary}`}>
                        Please provide your information
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {/* Name Input */}
                      <div>
                        <Label
                          className={`text-sm font-medium mb-2 block ${textSecondary}`}
                        >
                          Full Name *
                        </Label>
                        <div className="relative flex items-center justify-center">
                          <User
                            className={`absolute left-3 top-3 h-4 w-4 ${textSecondary}`}
                          />
                          <input
                            type="text"
                            value={bookingData.name}
                            onChange={(e) =>
                              updateBookingData("name", e.target.value)
                            }
                            className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 border-white/20 bg-white/10 text-white placeholder-slate-500`}
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div>
                        <Label
                          className={`text-sm font-medium mb-2 block ${textSecondary}`}
                        >
                          Email Address *
                        </Label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-3 top-3 h-4 w-4 ${textSecondary}`}
                          />
                          <input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) =>
                              updateBookingData("email", e.target.value)
                            }
                            className={`w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 border-white/20 bg-white/10 text-white placeholder-slate-500`}
                            placeholder="Enter your email"
                          />
                          {bookingData.email &&
                            !isValidEmail(bookingData.email) && (
                              <p className="mt-1 text-xs text-red-500">
                                Please enter a valid email address
                              </p>
                            )}
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <Label
                          className={`text-sm font-medium mb-2 block ${textSecondary}`}
                        >
                          Phone Number *
                        </Label>
                        <div className="relative">
                          <div className="flex">
                            <span
                              className={`inline-flex items-center px-3 rounded-l-xl border border-r-0 border-white/20 bg-white/10 text-slate-300 text-sm`}
                            >
                              +91
                            </span>
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={bookingData.phone}
                              onChange={(e) =>
                                updateBookingData(
                                  "phone",
                                  sanitizeIndianPhone(e.target.value)
                                )
                              }
                              className={`w-full pl-3 pr-3 py-3 border rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 border-white/20 bg-white/10 text-white placeholder-slate-500`}
                              placeholder="10-digit mobile"
                              maxLength={10}
                            />
                          </div>
                          {!isValidIndianMobile(bookingData.phone) &&
                            bookingData.phone.length > 0 && (
                              <p className="mt-1 text-xs text-red-500">
                                Enter a valid 10-digit Indian mobile starting
                                with 6-9
                              </p>
                            )}
                        </div>
                      </div>

                      {/* Ticket Type */}
                      <div>
                        <Label
                          className={`text-sm font-medium mb-2 block ${textSecondary}`}
                        >
                          Ticket Type *
                        </Label>
                        {/* Ticket type options removed in simplified flow */}
                      </div>

                      {/* Quantity Selection for Individual */}
                      <div>
                        <Label
                          className={`text-sm font-medium mb-2 block ${textSecondary}`}
                        >
                          Number of Seats *
                        </Label>
                        <Select
                          value={bookingData.quantity.toString()}
                          onValueChange={(value) =>
                            updateBookingData("quantity", parseInt(value))
                          }
                        >
                          <SelectTrigger
                            className={`rounded-xl transition-all duration-300 ${"bg-white/10 border-white/20 text-white hover:bg-white/15"}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent
                            className={`z-50 bg-slate-800 border-slate-300`}
                          >
                            {Array.from(
                              {
                                length: Math.min(
                                  10,
                                  selectedShow?.capacity || 10
                                ),
                              },
                              (_, i) => i + 1
                            ).map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className="text-white cursor-pointer hover:bg-slate-700 focus:bg-slate-700"
                              >
                                {num} {num === 1 ? "seat" : "seats"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedShow && (
                          <div
                            className={`text-xs mt-2 space-y-1 ${textSecondary}`}
                          >
                            <p>Total capacity: {selectedShow.capacity} seats</p>
                            {isLoadingBookings ? (
                              <p className="flex items-center gap-1">
                                <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-500"></div>
                                Loading booking data...
                              </p>
                            ) : (
                              <>
                                <p>
                                  Booked today: {bookedTodayForSelected} seats
                                </p>
                                <p className="font-semibold text-green-400">
                                  Available:{" "}
                                  {Math.max(
                                    0,
                                    selectedShow.capacity -
                                      bookedTodayForSelected
                                  )}{" "}
                                  seats
                                </p>
                              </>
                            )}
                          </div>
                        )}

                        {/* Warning for insufficient seats */}
                        {selectedShow &&
                          bookingData.quantity >
                            selectedShow.capacity - bookedTodayForSelected && (
                            <p className="text-xs mt-2 text-red-400">
                              ⚠️ Only{" "}
                              {Math.max(
                                0,
                                selectedShow.capacity - bookedTodayForSelected
                              )}{" "}
                              seats available for today
                            </p>
                          )}
                      </div>

                      {/* Bulk selection removed */}
                    </div>

                    {/* Navigation Buttons - Mobile Responsive */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          onClick={handlePrevious}
                          variant="outline"
                          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
                        >
                          <ChevronLeft className="mr-2 h-5 w-5" />
                          Previous
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          onClick={handleNext}
                          disabled={!isFormValid()}
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 text-lg font-semibold disabled:opacity-50"
                        >
                          Next
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Page 3: Ticket Preview */}
                {currentStep === "preview" && selectedShow && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                        Ticket Preview
                      </h2>
                      <p className={`${textSecondary}`}>
                        Review your booking details
                      </p>
                    </div>

                    {/* Ticket Design */}
                    <div className="max-w-md mx-auto">
                      <div
                        className={`relative ${cardBg} border ${cardBorder} rounded-2xl overflow-hidden shadow-2xl`}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)",
                        }}
                      >
                        {/* Ticket Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-lg">
                                BIRLA PLANETARIUM
                              </h3>
                              <p className="text-sm opacity-90">
                                Premium Experience
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="bg-white/20 rounded-full px-3 py-1">
                                <span className="text-xs font-semibold">
                                  PENDING
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ticket Body */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h4
                              className={`font-bold text-xl mb-2 ${textPrimary}`}
                            >
                              {selectedShow.show_time}
                            </h4>
                            <p className={`text-sm ${textSecondary} mb-3`}>
                              {selectedShow.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className={`${textSecondary} mb-1`}>Date</p>
                              <p className={`font-semibold ${textPrimary}`}>
                                {new Date(
                                  bookingData.selectedDate
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div>
                              <p className={`${textSecondary} mb-1`}>
                                Duration
                              </p>
                              <p className={`font-semibold ${textPrimary}`}>
                                {selectedShow.duration} minutes
                              </p>
                            </div>
                            <div>
                              <p className={`${textSecondary} mb-1`}>Seats</p>
                              <p className={`font-semibold ${textPrimary}`}>
                                {bookingData.quantity}{" "}
                                {bookingData.quantity === 1 ? "seat" : "seats"}
                              </p>
                            </div>
                            <div>
                              <p className={`${textSecondary} mb-1`}>
                                Price per seat
                              </p>
                              <p className={`font-semibold ${textPrimary}`}>
                                ₹{selectedShow.price}
                              </p>
                            </div>
                            <div>
                              <p className={`${textSecondary} mb-1`}>
                                Show time
                              </p>
                              <p className={`font-semibold ${textPrimary}`}>
                                {selectedShow.show_time} minutes
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-dashed pt-4">
                            <div className="flex justify-between items-center">
                              <span className={`${textSecondary}`}>
                                Total Amount
                              </span>
                              <span
                                className={`text-2xl font-bold ${textPrimary}`}
                              >
                                ₹{bookingData.totalAmount}
                              </span>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <User className="h-4 w-4 text-amber-500" />
                              <span className={`font-semibold ${textPrimary}`}>
                                Booking Details
                              </span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <p className={textSecondary}>
                                Name: {bookingData.name}
                              </p>
                              <p className={textSecondary}>
                                Phone: +91 {bookingData.phone}
                              </p>
                              <p className={textSecondary}>
                                Email: {bookingData.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-0 w-6 h-6 bg-slate-900 rounded-full transform -translate-x-3 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 right-0 w-6 h-6 bg-slate-900 rounded-full transform translate-x-3 -translate-y-1/2"></div>
                      </div>
                    </div>

                    {/* Navigation Buttons - Mobile Responsive */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          onClick={handlePrevious}
                          variant="outline"
                          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
                        >
                          <ChevronLeft className="mr-2 h-5 w-5" />
                          Previous
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          onClick={handlePayment}
                          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-3 text-lg font-semibold"
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          Proceed to Payment
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
