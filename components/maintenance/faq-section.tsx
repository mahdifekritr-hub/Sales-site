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
    question: "What types of maintenance can I manage with this platform?",
    answer: "Our platform supports all types of maintenance including preventive, corrective, emergency, and predictive maintenance. You can create work orders for any maintenance task, schedule recurring preventive maintenance, and track all maintenance activities in one centralized system."
  },
  {
    question: "How does the preventive maintenance scheduling work?",
    answer: "You can set up preventive maintenance schedules based on time intervals (daily, weekly, monthly, yearly) or meter readings (hours of operation, mileage, etc.). The system automatically generates work orders when maintenance is due and sends notifications to assigned technicians."
  },
  {
    question: "Can technicians access work orders from their mobile devices?",
    answer: "Yes! Our mobile app allows technicians to view assigned work orders, update task status, log time and materials, attach photos, and complete checklists directly from their smartphones or tablets. The app works offline and syncs when connectivity is restored."
  },
  {
    question: "How do I track maintenance costs and labor hours?",
    answer: "The platform includes comprehensive cost tracking features. You can log labor hours, material costs, and contractor expenses for each work order. Built-in reports show cost breakdowns by asset, location, work type, and time period to help you analyze spending patterns."
  },
  {
    question: "Can I manage external vendors and contractors?",
    answer: "Absolutely. Our vendor management module lets you maintain a directory of contractors, track their certifications and insurance, manage contracts, rate their performance, and even allow them limited access to view and update assigned work orders."
  },
  {
    question: "How does the asset tracking feature work?",
    answer: "You can create detailed asset records with specifications, warranty information, maintenance history, and documentation. Track asset lifecycle from acquisition to disposal, monitor performance metrics, and make data-driven decisions about repairs vs. replacement."
  },
  {
    question: "Is there a way to create custom maintenance checklists?",
    answer: "Yes, you can create customizable inspection checklists with various field types including checkboxes, text inputs, number fields, photo uploads, and signature capture. Checklists ensure consistent procedures and create documentation for compliance purposes."
  },
  {
    question: "Can I integrate with other software systems?",
    answer: "Our platform offers API access and integrates with popular tools including accounting software, ERP systems, IoT sensors for predictive maintenance, and building management systems. We also support data import/export in various formats."
  },
  {
    question: "What kind of reports and analytics are available?",
    answer: "You get access to comprehensive dashboards showing KPIs like work order completion rates, MTTR (Mean Time To Repair), maintenance costs, technician productivity, and more. Generate custom reports, schedule automatic report delivery, and export data for further analysis."
  },
];

export function MaintenanceFAQSection() {
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
            Everything you need to know about our maintenance management platform. Have a question not listed? Contact our support team.
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
