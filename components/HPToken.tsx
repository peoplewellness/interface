"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Vote, TrendingUp, Flame, Lock } from "lucide-react";

const tokenUtilities = [
  {
    icon: Vote,
    title: "Governance Rights",
    description: "Vote on rebate ratios, treasury parameters, and protocol upgrades. Governance does not control medical decisions.",
    highlight: "Transparent voting",
  },
  {
    icon: TrendingUp,
    title: "Rebate Amplification",
    description:
      "HP holders may receive amplified rebates based on governance-defined parameters and protocol surplus.",
    highlight: "Optional benefits",
  },
  {
    icon: Lock,
    title: "Treasury Alignment",
    description:
      "HP aligns long-term incentives between participants and protocol sustainability without restricting access.",
    highlight: "No inflation",
  },
  {
    icon: Flame,
    title: "Never Required",
    description:
      "HP is optional and never required for healthcare participation. Access to Powell is unrestricted.",
    highlight: "Voluntary only",
  },
];

const tokenStats = [
  { value: "100M", label: "Total Supply" },
  { value: "TBA", label: "Circulating" },
  { value: "TBA", label: "Staked" },
  { value: "TBA", label: "Burned" },
];

export function HPToken() {
  return (
    <section className="py-20 md:py-32 bg-surface/30 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide mb-4">
            TOKEN UTILITY
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-text-primary">The </span>
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              $HP
            </span>
            <span className="text-text-primary"> Token</span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            $HP is the governance and incentive token of Powell. Max supply: 100M. Optional and never
            required for healthcare participation. Aligns incentives without restricting access.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16 items-center">
          {/* Token Coin Graphic */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative group"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary-light/20 to-primary/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-accent-teal/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main coin */}
              <motion.div
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Inner circle */}
                <div className="w-60 h-60 rounded-full bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center border-4 border-white/30 shadow-inner">
                  <p className="text-5xl font-bold text-white drop-shadow-lg">$HP</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Utility Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tokenUtilities.map((utility, index) => {
              const Icon = utility.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-to-br from-surface to-surface/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-text-primary text-lg group-hover:text-primary transition-colors duration-300">
                        {utility.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                        {utility.description}
                      </p>
                      <p className="text-primary text-sm font-semibold group-hover:text-primary-light transition-colors duration-300">
                        {utility.highlight}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Token Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {tokenStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-surface/50 to-transparent border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.p
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-text-muted text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
