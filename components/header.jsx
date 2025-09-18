"use client"

import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function   Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const {theme , setTheme} = useTheme()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? " backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="container mx-auto px-6 py-4 max-w-7xl m-auto">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold text-primary name"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            OH
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {["About", "Work", "Skills", "Contact"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-foreground hover:text-primary transition-colors duration-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.button>
            ))}

            {theme === 'light' ? <Moon onClick={() => setTheme('dark')} /> : <Sun onClick={() => setTheme('light')} /> }
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
