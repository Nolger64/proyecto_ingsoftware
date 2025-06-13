"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-cream z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="w-32 h-32 mb-8"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="#f3c110" />
              <path d="M30,35 Q50,20 70,35 L70,65 Q50,80 30,65 Z" fill="#af500f" stroke="#41bb8c" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-2xl font-bold text-brown mb-2">Pollo Broaster</h1>
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-green" />
          <p className="text-brown">Cargando deliciosos sabores...</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
