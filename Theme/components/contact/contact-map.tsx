"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Phone } from "lucide-react";

export function ContactMap() {
  return (
    <section className="py-16 bg-slate-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Visit Our Location
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find us at the heart of Jaipur, easily accessible by all modes of
            transport
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative h-[350px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.4),transparent_40%),_radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.4),transparent_45%)]" />
                  <div className="text-center">
                    <div className="text-5xl">🗺️</div>
                    <p className="mt-3 text-slate-300">Map placeholder for demo theme</p>
                    <p className="text-slate-500 text-sm">Embed your own map here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm rounded-2xl hover:border-green-500/30 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Address</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-1">
                  <div>Demo Venue Name</div>
                  <div>123 Placeholder Street</div>
                  <div>City, State 000000</div>
                  <div>Country</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm rounded-2xl hover:border-purple-500/30 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Hours</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-1">
                  <div>Monday - Sunday</div>
                  <div>10:00 AM - 8:00 PM</div>
                  <div className="text-slate-400 text-xs mt-2">
                    Last show at 7:00 PM
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm rounded-2xl hover:border-cyan-500/30 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Contact</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-1">
                  <div>+00 0000 000000</div>
                  <div>+00 0000 000001</div>
                  <div className="text-slate-400 text-xs mt-2">Demo contact only</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
