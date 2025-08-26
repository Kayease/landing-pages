"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Users, Car } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Phone",
    primary: "+00-000-000000",
    secondary: "+00-000-000001",
    description: "Demo hotline (replace with your number)",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "Email",
    primary: "hello@example.com",
    secondary: "support@example.com",
    description: "Demo inbox (replace with your email)",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: MapPin,
    title: "Address",
    primary: "Demo Venue, Demo Science Center",
    secondary: "123 Placeholder Ave, City 000000, Country",
    description: "Sample address for preview",
    color: "from-green-500 to-emerald-500",
  },
];

const additionalInfo = [
  {
    icon: Clock,
    title: "Opening Hours",
    details: [
      "Mon-Sun: 1:00 PM - 5:00 PM",
      "Weekends: 1:00 PM, 3:00 PM, 5:00 PM",
      "Closed on Mondays and public holidays",
    ],
  },
  {
    icon: Users,
    title: "Group Bookings",
    details: [
      "Schools: 40% rebate for 25+ students",
      "Institutional letter head required",
      "All shows in Hindi",
    ],
  },
  {
    icon: Car,
    title: "Important Notice",
    details: [
      "Post COVID operations changed",
      "Closed on most public holidays",
      "Advance booking recommended",
    ],
  },
];

export function ContactInfo() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Multiple ways to reach us. Replace these with your own details.
          </p>
        </motion.div>

        {/* Primary Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="relative h-full border border-slate-700/50 bg-gradient-to-b from-slate-900/70 to-slate-800/40 backdrop-blur-xl transition-all duration-500 will-change-transform hover:shadow-[0_20px_40px_rgba(59,130,246,0.15),_0_8px_16px_rgba(0,0,0,0.25)] hover:-translate-y-1 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 transition-opacity duration-500 bg-gradient-to-r from-blue-500 to-cyan-500 [mask:linear-gradient(#000,transparent_60%)]" />
                <CardContent className="relative p-6 text-center">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${method.color} shadow-[inset_0_0_16px_rgba(255,255,255,0.15)] flex items-center justify-center mx-auto mb-4 transition-transform duration-500`}
                  >
                    <method.icon className="h-7 w-7 text-white drop-shadow" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                    {method.title}
                  </h3>

                  <div className="space-y-1 mb-3">
                    <div className="text-slate-200 font-medium text-sm">
                      {method.primary}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {method.secondary}
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs">{method.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="relative h-full border border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-800/30 backdrop-blur-xl transition-all duration-500 will-change-transform hover:shadow-[0_16px_32px_rgba(16,185,129,0.15),_0_6px_12px_rgba(0,0,0,0.25)] hover:-translate-y-1 rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[inset_0_0_12px_rgba(255,255,255,0.15)] flex items-center justify-center">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
