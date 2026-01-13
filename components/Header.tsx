"use client";

import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAppPage = pathname === "/app";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="https://github.com/peoplewellness/whitepaper/blob/main/whitepaper.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Whitepaper
            </a>
            {!isAppPage && (
              <a href="/app">
                <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-background font-semibold shadow-lg hover:shadow-primary/50 transition-all">
                  Launch App
                </Button>
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden py-4 border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              <a
                href="https://github.com/peoplewellness/whitepaper/blob/main/whitepaper.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Whitepaper
              </a>
              {!isAppPage && (
                <a href="/app" className="w-full">
                  <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-background font-semibold shadow-lg w-full">
                    Launch App
                  </Button>
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}
