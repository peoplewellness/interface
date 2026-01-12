"use client";

import { motion } from "motion/react";
import { ShoppingCart, FileText, Shield, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ShoppingCart,
    title: "Commit Funds",
    description:
      "Commit personal healthcare capital to time-bound protection plans represented as NFTs. Plans define terms, duration, and eligible categories.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Submit Claims",
    description:
      "Submit medical documents to licensed TPA after receiving treatment. TPAs validate eligibility, pre-existing conditions, benefit limits, and pre/post inpatient rules off-chain.",
  },
  {
    number: "03",
    icon: Shield,
    title: "TPA Validation",
    description:
      "TPA issues claim decision (approved/rejected/partial). Smart contracts receive only claim reference (hashed), approved amount, and authorization signature. No diagnoses or procedures on-chain.",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Receive Rebates",
    description:
      "Unused funds and eligible rebates automatically returned at plan maturity. Staying healthy should not result in capital loss.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-surface/30 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2F3810_1px,transparent_1px),linear-gradient(to_bottom,#2A2F3810_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">Simple Steps to </span>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Financial Protection
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Four simple steps to coordinate your healthcare financial protection
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Number Badge */}
                  <motion.div
                    className="relative mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary z-10">
                      <span className="text-primary font-bold text-sm">{step.number}</span>
                    </div>
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-surface to-surface-light border border-border shadow-lg flex items-center justify-center group-hover:shadow-primary/20 transition-all">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
