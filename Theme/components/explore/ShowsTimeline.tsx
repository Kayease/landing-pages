"use client";

import React, {useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const shows = [
  { title: "The Astounding Universe", date: "December, 1989" },
  { title: "The Land of the Midnight Sun", date: "June, 1990" },
  {
    title: "Wonders of the Night Sky & World's Greatest Mystery",
    date: "February, 1991",
  },
  { title: "Visitors From Outer Space", date: "June, 1993" },
  { title: "Secrets of the Universe", date: "June, 1994" },
  {
    title: "Celebrating the 25th anniversary of Moon Landing",
    date: "December, 1994",
  },
  { title: "The Blood Stained Jupiter", date: "December, 1994" },
  { title: "Eclipses", date: "September, 1995" },
  {
    title: "A Fantastic Voyage Through the Solar System",
    date: "August, 1996",
  },
  { title: "A Messenger From Mars", date: "June, 1997" },
  { title: "Echoes From the Ancient Skies – Kumbh Mela", date: "June, 1998" },
  { title: "The Hubble Universe", date: "May, 1999" },
  { title: "Space in New Millennium", date: "May, 2000" },
  { title: "The Violent Universe", date: "June, 2001" },
  { title: "Planets Beyond", date: "May 2002" },
  { title: "Reach for the Stars", date: "June, 2003" },
  { title: "Mars Beckons", date: "July, 2004" },
  { title: "The New Cosmos", date: "July, 2005" },
  { title: "Worlds in Collision", date: "July, 2006" },
  { title: "To the Land of the Midnight Sun (Remake)", date: "June, 2007" },
  { title: "Through the Eyes of Hubble (Remake)", date: "July 2008" },
  { title: "The Moon – Our Neighbour", date: "October, 2009" },
  { title: "Our Solar System", date: "March, 2011" },
  { title: "The Ancients & Their Stellar Connections", date: "November, 2013" },
  { title: "India's Pride - Mangalyaan", date: "September, 2016" },
  { title: "The Incredible Voyage of Cassini", date: "February, 2021" },
];

const ShowsTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!sectionRef.current) return;

  //   const ctx = gsap.context(() => {
  //     // Title animation
  //     gsap.from(titleRef.current, {
  //       y: 100,
  //       opacity: 0,
  //       duration: 1.2,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: titleRef.current,
  //         start: "top 85%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     // Cards batch animation
  //     const cards = gridRef.current?.querySelectorAll(".show-card");
  //     if (cards) {
  //       // Create batches of cards for staggered animation
  //       const batchSize = 6;
  //       for (let i = 0; i < cards.length; i += batchSize) {
  //         const batch = Array.from(cards).slice(i, i + batchSize);

  //         gsap.from(batch, {
  //           y: 60,
  //           opacity: 0,
  //           scale: 0.9,
  //           duration: 0.8,
  //           stagger: 0.1,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: batch[0],
  //             start: "top 90%",
  //             toggleActions: "play none none reverse",
  //           },
  //         });
  //       }

  //       // Hover effects
  //       cards.forEach((card) => {
  //         card.addEventListener("mouseenter", () => {
  //           gsap.to(card, {
  //             scale: 1.05,
  //             duration: 0.3,
  //             ease: "power2.out",
  //           });
  //         });

  //         card.addEventListener("mouseleave", () => {
  //           gsap.to(card, {
  //             scale: 1,
  //             duration: 0.3,
  //             ease: "power2.out",
  //           });
  //         });
  //       });
  //     }

  //     // Parallax effect for grid
  //     gsap.to(gridRef.current, {
  //       y: -40,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: 1.5,
  //       },
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/20 py-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Shows Through the Years
          </motion.h2>

          {/* Shows Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {shows.map((show, index) => (
              <motion.div
                key={index}
                className="show-card group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden">
                  {/* Shimmer effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" /> */}

                  {/* Card content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {show.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white leading-tight flex-1 group-hover:text-blue-300 transition-colors duration-300">
                      {show.title}
                    </h3>

                    {/* Decorative elements */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-purple-400 rounded-full" />
                      <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legacy Section */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              A Legacy of Excellence
            </h3>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <p className="text-lg text-slate-300 leading-relaxed">
                  Theme Demo venue is presented here with placeholder copy. Replace this text with your organization’s legacy, mission, and achievements to personalize the theme.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowsTimeline;
