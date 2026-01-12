"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Flame, Zap, BarChart3, Heart } from "lucide-react";

export default function MonkzPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section with Monk Character */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background - China Meme Style */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-background to-yellow-950/20">
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(241, 185, 10, 0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Floating Coins Animation */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <div className="text-4xl">🪙</div>
            </motion.div>
          ))}

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Monk Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.img
                  src="/monkz.jpg"
                  alt="Monkz"
                  className="relative rounded-3xl shadow-2xl border-4 border-primary/30"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-orange-500 text-background px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔥 BNB MEME SEASON 🔥
                </motion.div>
              </motion.div>

              {/* Right: Title & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-500 font-bold">LET IT HAPPENING</span>
                  <Flame className="w-5 h-5 text-orange-500" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-black mb-6">
                  <motion.span
                    className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    MONKZ
                  </motion.span>
                  <span className="block text-3xl md:text-5xl text-text-secondary mt-2">
                    The Enlightened Meme
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-text-secondary mb-4 leading-relaxed">
                  When ancient wisdom meets crypto degeneracy. The monk who sees through the market matrix.
                  <span className="text-primary font-bold"> No cap. Only enlightenment.</span>
                </p>

                {/* Powell Support Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent-teal/20 border border-primary/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-primary" />
                    <span className="text-primary font-bold">Supporting Powell Development</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    $MONKZ is meme token, for fun only. But it revenue will be use for POWELL Development.
                  </p>
                </motion.div>

                <div className="flex flex-wrap gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30"
                  >
                    <div className="text-3xl font-bold text-primary">$0.00042</div>
                    <div className="text-sm text-text-muted">Current Price</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                  >
                    <div className="text-3xl font-bold text-green-500">+16.7%</div>
                    <div className="text-sm text-text-muted">24h Change</div>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-background font-black text-xl px-12 py-7 shadow-2xl"
                  >
                    <Zap className="mr-2" size={24} />
                    BUY $MONKZ NOW
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10 font-bold text-xl px-10 py-7"
                  >
                    <BarChart3 className="mr-2" size={24} />
                    Chart
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-950/20 via-background to-yellow-950/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🧘‍♂️
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Join The Monastery
                </span>
              </h2>
              <p className="text-xl text-text-secondary mb-4">
                Where ancient wisdom meets degen culture. Trust the process. Achieve enlightenment.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
