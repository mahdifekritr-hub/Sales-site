"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of assets can I track with this platform?",
    answer: "Our platform supports tracking any type of asset including HVAC systems, elevators, generators, fire safety equipment, appliances, furniture, vehicles, and more. Each asset can have custom fields, documentation, and maintenance schedules tailored to its specific requirements."
  },
  {
    question: "How does QR code scanning work for asset identification?",
    answer: "Simply generate a unique QR code for each asset through our platform and attach it to the equipment. Technicians can scan the code using our mobile app to instantly access asset details, maintenance history, warranty information, and documentation. No internet connection is required for basic information."
  },
  {
    question: "Can I track parts inventory and manage stock levels?",
    answer: "Yes! Our parts inventory module tracks stock levels in real-time, automatically alerts you when inventory falls below minimum thresholds, and can even generate purchase orders for replenishment. You can also track which parts are used on which work orders for complete cost visibility."
  },
  {
    question: "How do I manage assets across multiple locations?",
    answer: "The platform supports hierarchical location structures - you can organize by property, building, floor, room, or any custom hierarchy. Filter and report on assets by location, track asset movements between locations, and assign location-specific maintenance schedules."
  },
  {
    question: "Can I track warranty expiration dates and service agreements?",
    answer: "Absolutely. Each asset can have warranty information including coverage dates, terms, and vendor contacts. The system automatically notifies you before warranties expire so you can schedule inspections or make claims. Service agreements and contracts can also be attached and tracked."
  },
  {
    question: "How does the purchase order system work?",
    answer: "When parts inventory runs low or you need new equipment, create purchase orders directly in the system. Track PO status from creation to delivery, manage vendor relationships, and automatically update inventory when items are received. Integration with invoicing streamlines the payment process."
  },
  {
    question: "Can I track the total cost of ownership for assets?",
    answer: "Yes, the platform tracks acquisition costs, maintenance expenses, parts replacements, and labor hours for each asset. Generate reports showing total cost of ownership over time to make data-driven decisions about repairs versus replacement."
  },
  {
    question: "Is there a mobile app for field technicians?",
    answer: "Our mobile app allows technicians to scan QR codes, view asset details, update maintenance records, attach photos, and complete checklists directly from their smartphones. The app works offline and syncs when connectivity is restored."
  },
  {
    question: "How does asset tracking integrate with maintenance work orders?",
    answer: "Assets are directly linked to work orders, so you have complete visibility into maintenance history. When creating a work order, simply select the asset and all relevant information is automatically populated. Completed work orders update the asset's maintenance history automatically."
  },
];

export function AssetsFAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-32" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute left-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center lg:mb-16"
        >
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
            Everything you need to know about our asset and inventory management platform. Have a question not listed? Contact our support team.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 sm:px-6 shadow-sm transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-white"
                >
                  <AccordionTrigger className="py-4 sm:py-5 text-left text-sm sm:text-base font-medium text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <a
              href="https://propertycareapp.com/contact-us/"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Get in touch with our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
