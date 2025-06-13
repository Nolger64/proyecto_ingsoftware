"use client"

import { useState } from "react"
import { motion } from "framer-motion"
// import { useAppContext } from "@/context/app-context" // Se comenta para resolver el error de importación
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Home, Phone, MessageCircle, Loader2, Search } from "lucide-react"

export default function MapSection() {
  // Dado que useAppContext no se puede resolver en este entorno, se utiliza una función vacía de marcador de posición.
  const setCurrentSection = (section) => {
    console.log(`Navegando a la sección: ${section}`);
    // Aquí puedes agregar tu lógica de enrutamiento o manejo de estado si es necesario.
  };
  const [isMapLoading, setIsMapLoading] = useState(false)
  const [trackingInput, setTrackingInput] = useState("")
  const [isTracking, setIsTracking] = useState(false)
  const [orderFound, setOrderFound] = useState(false)

  const phoneNumber = "+573126613981"
  const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`
  const callLink = `tel:${phoneNumber}`

  const handleTrackOrder = () => {
    if (!trackingInput.trim()) return

    setIsMapLoading(true)
    setIsTracking(true)

    // Simula una llamada a una API para buscar el pedido
    setTimeout(() => {
      setOrderFound(true)
      setIsMapLoading(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full flex flex-col p-6 bg-white"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-between items-center mb-6"
      >
        <Button
          variant="outline"
          onClick={() => setCurrentSection("home")}
          className="bg-white hover:bg-gray-50 text-brown border-brown"
        >
          <Home className="mr-2 h-5 w-5" />
          Inicio
        </Button>
        <h1 className="text-2xl font-bold text-brown">Seguimiento</h1>
        <div className="w-[72px]"></div> {/* Espaciador para centrar el título */}
      </motion.div>

      {!isTracking ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <Card className="w-full max-w-md p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-xl font-bold text-brown mb-2">Ingresa tu número de guía</h2>
              <p className="text-gray-600">Para rastrear tu pedido en tiempo real</p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Ej: PB123456"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="text-center text-lg"
              />
              <Button
                onClick={handleTrackOrder}
                className="w-full bg-yellow hover:bg-yellow/90 text-brown"
                disabled={!trackingInput.trim()}
              >
                <Search className="mr-2 h-5 w-5" />
                Rastrear Pedido
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative shadow-lg"
        >
          {isMapLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 animate-spin text-red mb-2" />
                <p className="text-brown">Localizando tu pedido...</p>
              </div>
            </div>
          ) : orderFound ? (
            <div className="w-full h-full relative">
              {/* Mapa estático usando la imagen de /images/maps.png */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url('/images/maps.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Marcador de ubicación animado */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <div className="w-8 h-8 bg-yellow rounded-full flex items-center justify-center border-2 border-brown shadow-lg">
                  <div className="w-4 h-4 bg-red rounded-full"></div>
                </div>
              </motion.div>

              {/* Información del pedido */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-brown">Pedido #{trackingInput}</h3>
                  <span className="bg-red text-white px-3 py-1 rounded-full text-xs font-bold">En camino</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Tiempo estimado: 15-20 minutos</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-yellow h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-500">Repartidor: Juan Pérez</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-xl font-bold text-brown mb-2">Pedido no encontrado</h3>
                <p className="text-gray-600 mb-4">Verifica el número de guía e intenta de nuevo.</p>
                <Button onClick={() => setIsTracking(false)} className="bg-yellow hover:bg-yellow/90 text-brown">
                  Intentar de nuevo
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Botones de acción que aparecen cuando se encuentra el pedido */}
      {isTracking && orderFound && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <a href={callLink}>
            <Button className="w-full bg-red hover:bg-red/90 text-white shadow-lg">
              <Phone className="mr-2 h-5 w-5" />
              Llamar
            </Button>
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-yellow hover:bg-yellow/90 text-brown shadow-lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp
            </Button>
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}
