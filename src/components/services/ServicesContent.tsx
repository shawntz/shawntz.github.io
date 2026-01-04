"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, ArrowRight, Plus, Minus, ChevronUp } from "lucide-react";
import { RippleLink } from "@/components/ui/Ripple";

interface Service {
  title: string;
  description: string;
  hourlyRate: string;
  projectRange: string;
  features: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServicesContentProps {
  services: Service[];
  testimonials: Testimonial[];
  contactEmail: string;
}

const faqs: FAQ[] = [
  {
    question: "Hourly Consulting?",
    answer:
      "Ideal for ongoing advisory work, code reviews, or when project scope is flexible. Billed in hourly increments with detailed time tracking.",
  },
  {
    question: "Fixed-Price Projects?",
    answer:
      "Best for well-defined projects with clear deliverables. I'll provide a comprehensive quote after understanding your requirements.",
  },
  {
    question: "Retainer Agreements?",
    answer:
      "Perfect for long-term partnerships. Reserve a set number of hours per month at a discounted rate with priority scheduling.",
  },
  {
    question: "What's the best way to start?",
    answer:
      "Send a short message via the contact form or email with a few lines about your project. I'll get back to you within 1–2 business days.",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We'll discuss your goals, timeline, and requirements in detail.",
  },
  {
    number: "02",
    title: "Proposal & Agreement",
    description: "I'll provide a detailed scope, timeline, and pricing structure.",
  },
  {
    number: "03",
    title: "Execution & Updates",
    description: "Regular check-ins and transparent communication throughout.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    description: "Launch with confidence, plus ongoing support as needed.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border-light last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-5 py-5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-foreground">{faq.question}</span>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <Minus className="h-5 w-5 text-foreground-tertiary" />
          ) : (
            <Plus className="h-5 w-5 text-foreground-tertiary" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-foreground-secondary leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProcessItem({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-border-light last:border-b-0 py-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground">{step.number}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-1 text-foreground-secondary">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesContent({
  services,
  testimonials,
  contactEmail,
}: ServicesContentProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(3); // Default open "What's the best way to start?"

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl font-semibold tracking-tight md:text-[64px]">
          Let&apos;s Work Together
        </h1>
        <p className="mt-6 text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed text-balance">
          I offer consulting services in data science, research methodology, and
          software development. Whether you need help with a specific project or
          ongoing support, I&apos;m here to help.
        </p>
      </motion.header>

      {/* Services Grid */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2 mb-20"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="group"
          >
            <div className="flex flex-col h-full rounded-2xl border border-border-light bg-surface p-8 transition-all hover:border-accent/50 hover:shadow-lg">
              {/* Title */}
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground">
                {service.title}
              </h2>

              {/* Description */}
              <p className="mt-3 text-foreground-secondary text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Pricing */}
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-foreground-tertiary">
                    Hourly Rate
                  </p>
                  <p className="mt-1 text-xl font-semibold text-foreground tracking-tight">
                    {service.hourlyRate}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-foreground-tertiary">
                    Project Range
                  </p>
                  <p className="mt-1 text-xl font-semibold text-foreground tracking-tight">
                    {service.projectRange}
                  </p>
                </div>
              </div>

              {/* What You Get */}
              <div className="mt-6">
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-foreground-tertiary mb-3">
                  What You Get
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground-secondary"
                    >
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Pricing Intro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-16 text-center"
      >
        <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
          Every project is unique. I offer both hourly and project-based pricing.
          <br />
          Let&apos;s discuss which model works best for your goals.
        </p>
      </motion.section>

      {/* FAQs and Process */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-20 grid gap-12 lg:grid-cols-2"
      >
        {/* Flexible Engagement Models (FAQs) */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Flexible Engagement Models
          </h2>
          <div className="rounded-2xl bg-surface border border-border-light overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* My Process */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            My Process
          </h2>
          <div>
            {processSteps.map((step, index) => (
              <ProcessItem key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      {testimonials.length > 0 && testimonials[0].author !== "Client Name" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-semibold text-center mb-10">
            What Clients Say
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border-light bg-surface p-8"
              >
                <blockquote className="text-foreground-secondary italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-foreground-tertiary">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-10 md:p-16 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Ready to get started?
        </h2>
        <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
          Let&apos;s discuss your project. Send me an email with a brief overview
          of what you&apos;re looking for and I&apos;ll get back to you within 24-48 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${contactEmail}?subject=Consulting%20Inquiry`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-medium text-white hover:bg-accent-hover transition-colors active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </a>
          <RippleLink
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3 font-medium text-foreground hover:bg-surface transition-colors"
          >
            View Resume
            <ArrowRight className="h-4 w-4" />
          </RippleLink>
        </div>
      </motion.section>
    </div>
  );
}
