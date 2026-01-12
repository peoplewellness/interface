"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is Powell and how does it work?",
    answer:
      "Powell is decentralized healthcare financial infrastructure—not an insurance company. You commit funds to time-bound healthcare protection plans represented as participation NFTs. Your capital is pooled transparently on-chain through smart contracts. Approved reimbursements reduce your balance, and any unused funds are automatically returned to you at the end of the plan period.",
  },
  {
    question: "Is Powell custodial? Do you hold my funds?",
    answer:
      "No. Powell uses decentralized smart contracts to manage all participant funds on-chain. Your funds are visible, auditable, and segregated from operational entities. The blockchain ensures transparent custody, accounting, and settlement through deterministic rules. Medical decisions and clinical responsibility remain off-chain with licensed professionals.",
  },
  {
    question: "How are reimbursements processed?",
    answer:
      "Powell operates on a reimbursement-first model. Medical review, validation, and approval are performed off-chain by licensed Third-Party Administrators (TPAs) and healthcare professionals. Once approved, reimbursements are settled on-chain via smart contracts, ensuring auditable and predictable fund flows. Future phases will introduce cashless settlement at partner providers.",
  },
  {
    question: "What is the $HP token used for?",
    answer:
      "$HP is the governance token of Powell with a maximum supply of 100 million. Token holders can vote on protocol parameters, treasury strategy, and platform upgrades. 20% of annual platform profit is allocated to active participants or HP token burn. HP is optional and not required to use Powell but strengthens long-term alignment with the platform.",
  },
  {
    question: "How do capital returns work?",
    answer:
      "At the end of your plan period, any unused healthcare capital is automatically returned to you. For example, if you committed 1,000 USDT (with 5% admin fee = 950 USDT pooled), and only used 300 USDT in reimbursements, you receive 650 USDT back. If you file no reimbursement requests, you get 950 USDT back.",
  },
  {
    question: "What happens if my expenses exceed my committed balance?",
    answer:
      "If approved healthcare expenses exceed your remaining balance, additional reimbursements may be sourced from shared protocol reserves, subject to predefined benefit limits and governance-approved parameters. This ensures you have real protection during high-cost medical events. Your protection is not strictly limited to your committed amount alone.",
  },
  {
    question: "How does Powell lower healthcare costs?",
    answer:
      "Powell reduces administrative inefficiencies through blockchain automation, eliminates capital loss for healthy individuals, applies collective self-insurance and cost-sharing principles for capital preservation, and creates transparent financial coordination at scale. By aligning incentives around wellness and preventing unnecessary capital loss, Powell aims to lower the effective cost of healthcare over time.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-surface/30 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-text-primary">Frequently Asked </span>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-surface/80 to-surface/40 border border-border rounded-2xl p-4 md:p-8 backdrop-blur-sm shadow-xl">
            <div className="space-y-1">
              {faqData.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    className={`border-b border-border last:border-b-0 transition-all duration-300 ${
                      isOpen ? "bg-gradient-to-r from-primary/5 to-transparent" : "hover:bg-surface-light/20"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full text-left py-6 px-4 flex justify-between items-center gap-4 group transition-colors ${
                        isOpen ? "text-primary" : "text-text-primary hover:text-primary"
                      }`}
                    >
                      <span
                        className={`text-lg font-medium transition-all duration-300 ${
                          isOpen
                            ? "bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
                            : ""
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${
                          isOpen ? "rotate-180 text-primary" : "text-text-muted group-hover:text-primary"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        className="px-4 pb-6 text-text-secondary leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
