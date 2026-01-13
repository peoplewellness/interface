"use client";

import { motion } from "motion/react";
import { Github, Twitter, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <motion.a
                href="/"
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                  <img src="/powell-logo.png" alt="Powell Logo" className="relative w-10 h-10 rounded-full shadow-lg" />
                </div>
                <div>
                  <div className="text-xl font-bold text-text-primary tracking-tight">POWELL</div>
                  <div className="text-xs text-text-muted font-medium">People Wellness</div>
                </div>
              </motion.a>
              <p className="text-text-secondary max-w-sm leading-relaxed">
                Decentralized healthcare financial infrastructure. Own your wellness, control your capital.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/peoplewellness/whitepaper/blob/main/whitepaper.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/app"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Launch App
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-text-primary font-semibold mb-4">Community</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:harisaginting@gmail.com"
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-text-muted">
              © {new Date().getFullYear()} Powell - People Wellness. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:harisaginting@gmail.com"
                className="text-text-muted hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
