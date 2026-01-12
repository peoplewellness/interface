"use client";

import { motion } from "motion/react";
import { Card } from "./ui/card";

const partners = Array.from({ length: 12 }, (_, i) => ({
  name: "TBD",
  category: "Healthcare Partner",
  id: i + 1,
}));

const backers = Array.from({ length: 6 }, (_, i) => ({
  name: "TBD",
  category: "Strategic Investor",
  id: i + 1,
}));

export function Partners() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-teal/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              PARTNERS{" "}
            </span>
            <span className="text-text-primary">&</span>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              {" "}BACKERS
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Building the future of healthcare with strategic partners and investors
          </p>
        </motion.div>

        {/* Healthcare Partners */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-text-primary mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Healthcare Partners
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-surface to-surface/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 p-6 flex flex-col items-center justify-center min-h-[140px] group cursor-pointer">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-surface-light to-surface flex items-center justify-center mb-3 mx-auto group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300 border border-border">
                      <span className="text-text-muted text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                        ?
                      </span>
                    </div>
                    <p className="text-text-secondary font-semibold text-sm group-hover:text-text-primary transition-colors duration-300">
                      {partner.name}
                    </p>
                    <p className="text-text-muted text-xs mt-1">{partner.category}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Strategic Backers */}
        <div>
          <motion.h3
            className="text-2xl font-bold text-text-primary mb-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Strategic Backers
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {backers.map((backer, index) => (
              <motion.div
                key={backer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-surface to-surface/50 border-border hover:border-accent-teal/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-teal/10 p-6 flex flex-col items-center justify-center min-h-[160px] group cursor-pointer">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-teal/20 to-accent-teal/5 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 border border-accent-teal/20">
                      <span className="text-text-muted text-xl font-bold group-hover:text-accent-teal transition-colors duration-300">
                        ?
                      </span>
                    </div>
                    <p className="text-text-secondary font-semibold text-sm group-hover:text-text-primary transition-colors duration-300">
                      {backer.name}
                    </p>
                    <p className="text-text-muted text-xs mt-1">{backer.category}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-text-secondary mb-4">Interested in partnering with Powell?</p>
          <a
            href="mailto:harisaginting@gmail.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors group"
          >
            <span>Get in touch</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
