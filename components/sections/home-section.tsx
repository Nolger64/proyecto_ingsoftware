"use client"

import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { MapPin, ShoppingBag } from "lucide-react"

export default function HomeSection() {
  const { setCurrentSection } = useAppContext()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full flex flex-col items-center justify-center p-6 bg-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-64 h-64 mb-8"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <circle cx="50" cy="50" r="45" fill="#f3c110" />
              <path d="M30,35 Q50,20 70,35 L70,65 Q50,80 30,65 Z" fill="#af500f" stroke="#e7270a" strokeWidth="2" />
              <text x="50" y="55" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">
                BROASTER
              </text>
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-3xl font-bold text-brown mb-2 text-center"
      >
        ¡El mejor pollo broaster de la ciudad!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-gray-600 mb-8 text-center"
      >
        Crujiente por fuera, jugoso por dentro
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
      >
        <Button
          onClick={() => setCurrentSection("products")}
          className="flex-1 h-16 text-lg bg-yellow hover:bg-yellow/90 text-brown shadow-lg hover:shadow-xl transition-all"
        >
          <ShoppingBag className="mr-2 h-6 w-6" />
          Nuevo Pedido
        </Button>
        <Button
          onClick={() => setCurrentSection("map")}
          className="flex-1 h-16 text-lg bg-red hover:bg-red/90 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <MapPin className="mr-2 h-6 w-6" />
          Seguir Pedido
        </Button>
      </motion.div>
    </motion.div>
  )
}
