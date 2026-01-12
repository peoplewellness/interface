"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Lock, Zap, BarChart, Globe, Coins, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Participation NFTs",
    description:
      "Time-bound healthcare protection plans represented as NFTs. Define participation terms, duration, and eligible reimbursement categories.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Lock,
    title: "Decentralized Custody",
    description:
      "Funds pooled transparently on-chain and remain attributable to participants. Segregated from operators with deterministic rules.",
    gradient: "from-accent-teal/20 to-accent-teal/5",
  },
  {
    icon: Zap,
    title: "Rebate Mechanism",
    description:
      "Unused funds and eligible rebates automatically returned at plan maturity. Staying healthy should not result in capital loss.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Coins,
    title: "Collective Self-Insurance",
    description:
      "Self-insurance and cost-sharing principles traditionally used by large organizations, now accessible to individuals.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Aware Architecture",
    description:
      "Medical data never enters the blockchain. TPAs handle sensitive information off-chain. Only financial settlements recorded on-chain.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Globe,
    title: "Reimbursement-First Model",
    description:
      "Medical review and validation performed off-chain by licensed TPAs. Settlements processed on-chain for auditability.",
    gradient: "from-accent-teal/20 to-accent-teal/5",
  },
  {
    icon: BarChart,
    title: "Treasury Transparency",
    description:
      "All pooled funds visible on-chain. Governed by transparent parameters. Prioritizes solvency and predictability.",
    gradient: "from-primary/20 to-primary/5",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />

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
            WHAT IS POWELL
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">Healthcare Financial </span>
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent-teal bg-clip-text text-transparent">
              Infrastructure
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Powell is not insurance. It is decentralized healthcare financial infrastructure built for
            people to own, coordinate, and protect their wellness capital. By applying collective
            self-insurance principles and reducing administrative inefficiencies, Powell aims to lower
            the effective cost of healthcare.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-surface to-surface/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-light transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-text-primary text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
