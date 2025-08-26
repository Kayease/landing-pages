"use client";

import { motion } from "framer-motion";
import { Star, Clock, Users, Award, Rocket, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function CurrentShowSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950 relative overflow-hidden">
      {/* Background Planets */}
      <div className="absolute inset-0 z-0">
        {/* Mars in background */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/Planets/Mars.png"
            alt="Mars"
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Earth in background */}
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 opacity-20"
          animate={{
            rotate: [0, -360],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/Planets/Earth.png"
            alt="Earth"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header with Logo */}
          <div className="text-center mb-16">
            {/* Animated Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Rocket className="h-4 w-4 text-red-400" />
              </motion.div>
              <span className="text-sm font-medium text-red-200">
                Featured Show
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3 text-orange-400" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              India&lsquo;s Pride: Mangalyaan
            </motion.h2>

            <motion.p
              className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the triumphs and tribulations of Indian space
              exploration through this spectacular planetarium show
            </motion.p>
          </div>

          {/* Show Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Show Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  The red planet Mars has been worshipped as the God of anger
                  and war since the ancient times. Now we know, Mars is not only
                  the second nearest planet after Venus, it has got all the
                  potential to harbour past, present as well as future life.
                </p>

                <p>
                  India created a history in space exploration when Mangalyaan,
                  the first Indian space probe to Mars, reached successfully its
                  destination. The present planetarium programme highlights the
                  triumphs and tribulations of Indian scientists involved in the
                  space programme.
                </p>

                <p>
                  The programme also discusses all the important findings by
                  different international explorations over the years which has
                  only strengthened our resolve to transform planet Mars as the
                  second abode for the human kind in the years to come.
                </p>

                <p>
                  The spectacular discoveries and some historical anecdotes come
                  alive on the planetarium dome with its newly installed wide
                  format video projection and a renovated multi-channel audio
                  delivery system.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Show Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 rounded-xl backdrop-blur-sm overflow-hidden shadow-2xl">
                <div className="relative h-64 bg-gradient-to-br from-red-900/50 via-orange-900/50 to-yellow-900/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                  {/* Mars Image in background */}
                  {/* <div className="absolute top-4 right-4 w-20 h-20 opacity-30">
                    <Image
                      src="/Planets/Mars.png"
                      alt="Mars"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div> */}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mx-auto mb-4 w-24 h-24"
                      >
                        <Image
                          src="/Planets/Mars.png"
                          alt="Mars"
                          width={96}
                          height={96}
                          className="w-24 h-24 object-contain drop-shadow-lg"
                        />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Mangalyaan Mission
                      </h3>
                      <p className="text-slate-300">
                        India&apos;s First Mars Orbiter
                      </p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Show Times</span>
                      <div className="flex gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-red-500/20 text-red-300 border-red-500/30"
                        >
                          1:00 PM
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-orange-500/20 text-orange-300 border-orange-500/30"
                        >
                          5:00 PM
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Price</span>
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-400 bg-green-400/10"
                      >
                        ₹80 per person
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Student Groups</span>
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400 bg-blue-400/10"
                      >
                        40% discount
                      </Badge>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-slate-400">
                        <Star className="h-4 w-4 inline mr-1 text-yellow-400" />
                        Inaugurated: September 2016
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Duration</div>
                    <div className="text-sm text-slate-300">45 minutes</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-semibold text-white">Language</div>
                    <div className="text-sm text-slate-300">Hindi</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Award className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="font-semibold text-white">Age Group</div>
                    <div className="text-sm text-slate-300">All Ages</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">Category</div>
                    <div className="text-sm text-slate-300">
                      Space Exploration
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
