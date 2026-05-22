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
    question: "What communication channels are supported?",
    answer: "Our platform supports multiple communication channels including email, SMS, push notifications, in-app messaging, and a dedicated resident social feed. You can send announcements through any combination of these channels to ensure maximum reach."
  },
  {
    question: "How does the resident portal/social network work?",
    answer: "The resident portal is a dedicated social network for your building community. Residents can post updates, share announcements, create interest-based groups, and chat with neighbors. It's designed to foster community connections while giving management full visibility and moderation controls."
  },
  {
    question: "Can I target specific groups with announcements?",
    answer: "Yes! You can send announcements to all residents, specific floors or buildings, individual units, or custom groups you create (like pet owners, parking permit holders, etc.). This targeting ensures residents only receive relevant communications."
  },
  {
    question: "How does the AI community assistant work?",
    answer: "Our AI assistant is always present in resident groups and can answer common questions about building rules, amenities, events, and announcements. It learns from your building's specific information and can handle routine inquiries 24/7, freeing up management for more complex issues."
  },
  {
    question: "Can I schedule announcements in advance?",
    answer: "Absolutely! You can compose announcements and schedule them for future delivery at specific dates and times. This is perfect for planned maintenance notices, event reminders, or any communication you want to prepare ahead of time."
  },
  {
    question: "What are virtual events and how do they work?",
    answer: "Virtual events allow you to host online community meetings, town halls, workshops, or social gatherings. Residents can join from any device, participate in real-time discussions, and engage through chat. You can also record sessions for those who can't attend live."
  },
  {
    question: "How do I track if residents received and read my messages?",
    answer: "Our platform provides detailed analytics including delivery rates, open rates, and engagement metrics for each communication channel. You can see which residents have read announcements and follow up with those who haven't for critical communications."
  },
  {
    question: "What is the job and interest board?",
    answer: "The job and interest board is a community bulletin where residents can share job opportunities, professional services, hobbies, and skills. It helps neighbors connect, discover local talents, and support each other while building a stronger community."
  },
  {
    question: "Is there a mobile app for residents?",
    answer: "Yes! Residents can download our mobile app to receive push notifications, participate in the community feed, chat with neighbors, RSVP to events, and access all communication features on the go. The app works on both iOS and Android devices."
  },
];

export function CommunicationFAQSection() {
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
            Everything you need to know about our communication platform. Have a question not listed? Contact our support team.
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
