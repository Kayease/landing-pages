"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How do I book tickets for planetarium shows?",
    answer:
      "You can book tickets online through our website, call us directly, or visit our box office. We recommend booking in advance, especially for weekend shows and school holidays.",
  },
  {
    question: "Are there age restrictions for the shows?",
    answer:
      "Most of our shows are suitable for all ages. However, some advanced astronomy shows are recommended for ages 8 and above. Each show listing includes age recommendations.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes! We offer special rates for groups of 20 or more people. Schools, colleges, and corporate groups can avail of discounted rates. Contact us for custom packages.",
  },
  {
    question: "Is the planetarium wheelchair accessible?",
    answer:
      "Yes, our facility is fully wheelchair accessible. We have designated seating areas and accessible restrooms. Please inform us during booking for special arrangements.",
  },
  {
    question: "Can I bring food and drinks inside?",
    answer:
      "Outside food and drinks are not allowed inside the planetarium dome. However, we have a cafeteria on-site where you can purchase refreshments before or after the show.",
  },
  {
    question: "What should I expect during a planetarium show?",
    answer:
      "Our shows feature immersive 360-degree visuals projected on the dome ceiling. You'll recline in comfortable seats and journey through space. Shows typically last 45-60 minutes with surround sound.",
  },
  {
    question: "Do you offer educational programs for schools?",
    answer:
      "Yes! We have comprehensive educational programs for all grade levels, including guided tours, workshops, and curriculum-aligned content. Teachers can download free resources from our website.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Tickets can be cancelled up to 24 hours before the show for a full refund. For group bookings, we require 48 hours notice. Weather-related cancellations are fully refundable.",
  },
]

export function ContactFAQ() {
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4"
          >
            <HelpCircle className="h-3 w-3 text-orange-400" />
            <span className="text-xs font-medium">Frequently Asked Questions</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Got Questions?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find answers to the most commonly asked questions about our planetarium
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-slate-800/50 border-slate-700 rounded-xl px-5 backdrop-blur-sm hover:border-orange-500/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-white hover:text-orange-400 transition-colors text-sm font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 leading-relaxed text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
