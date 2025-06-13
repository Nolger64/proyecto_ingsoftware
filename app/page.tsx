"use client"

import { useEffect, useState } from "react"
import { useAppContext } from "@/context/app-context"
import LoadingScreen from "@/components/loading-screen"
import HomeSection from "@/components/sections/home-section"
import MapSection from "@/components/sections/map-section"
import ProductsSection from "@/components/sections/products-section"
import { AnimatePresence, motion } from "framer-motion"
import PersonalSection from "@/components/sections/personal-section"
import CartSection from "@/components/sections/cart-section"
import PaymentSection from "@/components/sections/payment-section"
import CompletedSection from "@/components/sections/completed-section"

export default function Home() {
  const { currentSection } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="h-screen w-screen overflow-hidden bg-white relative">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <AnimatePresence mode="wait">
              {currentSection === "home" && <HomeSection key="home" />}
              {currentSection === "map" && <MapSection key="map" />}
              {currentSection === "products" && <ProductsSection key="products" />}
              {currentSection === "personal" && <PersonalSection key="personal" />}
              {currentSection === "cart" && <CartSection key="cart" />}
              {currentSection === "payment" && <PaymentSection key="payment" />}
              {currentSection === "completed" && <CompletedSection key="completed" />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
