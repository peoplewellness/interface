"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Reimbursement Coordination Pilot",
    status: "completed" as const,
    items: [
      "Reimbursement-only health insurance policies",
      "NFT-based policy issuance",
      "On-chain treasury and settlement",
      "Claims managed off-chain by licensed TPAs",
      "Initial market validation",
    ],
  },
  {
    phase: "Phase 2",
    title: "Governance Activation",
    status: "in-progress" as const,
    items: [
      "Decentralized governance (DAO)",
      "Community participation in protocol parameters",
      "Treasury transparency and reporting",
      "Gradual decentralization",
    ],
  },
  {
    phase: "Phase 3",
    title: "Ecosystem Integration",
    status: "planned" as const,
    items: [
      "Integration with healthcare providers",
      "Improved claims workflows",
      "Preparation for healthcare system interoperability",
    ],
  },
  {
    phase: "Phase 4",
    title: "Cashless Settlement Enablement",
    status: "planned" as const,
    items: [
      "Cashless claims at partner providers",
      "Real-time coverage verification via NFTs",
      "On-chain settlement with off-chain validation",
    ],
  },
  {
    phase: "Phase 5",
    title: "Community & Infrastructure Support",
    status: "planned" as const,
    items: [
      "Community-driven medical fundraising",
      "Decentralized medical assistance pools",
      "Healthcare infrastructure financing",
      "Hospital expansion & medical equipment",
    ],
  },
  {
    phase: "Phase 6",
    title: "Global Expansion",
    status: "planned" as const,
    items: [
      "Multi-region expansion",
      "Local regulatory adaptation",
      "Access for underserved populations",
      "Continuous protocol evolution",
    ],
  },
];

export function Roadmap() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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
            ROADMAP
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-text-primary">Building the </span>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Future
            </span>
          </h2>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {roadmapPhases.map((phase, index) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";
            const Icon = isCompleted ? CheckCircle2 : isInProgress ? Clock : Circle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full bg-gradient-to-br from-surface to-surface/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative group ${
                    isInProgress ? "border-primary/30 shadow-primary/10" : ""
                  }`}
                >
                  {/* Status Indicator */}
                  {isInProgress && (
                    <div className="absolute -top-3 left-4">
                      <Badge className="bg-gradient-to-r from-primary to-primary-light text-background font-semibold shadow-lg animate-pulse border-0">
                        Now
                      </Badge>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent-teal/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-accent-teal" />
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        className={`w-5 h-5 ${
                          isCompleted
                            ? "text-accent-teal"
                            : isInProgress
                            ? "text-primary"
                            : "text-text-muted"
                        } group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-text-muted font-medium">{phase.phase}</span>
                    </div>
                    <CardTitle className="text-text-primary text-xl group-hover:text-primary transition-colors duration-300">
                      {phase.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-2 text-sm">
                          <span
                            className={`mt-1.5 ${
                              isCompleted
                                ? "text-accent-teal"
                                : isInProgress
                                ? "text-primary"
                                : "text-primary/60"
                            }`}
                          >
                            •
                          </span>
                          <span className="text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
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
