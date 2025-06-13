"use client"

import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, MapPin, Phone, MessageCircle, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function CompletedSection() {
  const { setCurrentSection, trackingNumber, paymentMethod, personalData, getTotalPrice } = useAppContext()
  const [copied, setCopied] = useState(false)

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const estimatedTime = new Date(Date.now() + 25 * 60 * 1000).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  })

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
        <h1 className="text-2xl font-bold text-brown">¡Pedido Confirmado!</h1>
        <div className="w-[72px]"></div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-brown mb-2">¡Gracias por tu pedido!</h2>
          <p className="text-gray-600 text-lg">Tu delicioso pollo broaster está en preparación</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full space-y-4"
        >
          <Card className="p-6 bg-white border shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
              <h3 className="text-xl font-bold text-brown">Detalles del Pedido</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-brown mb-2">Número de Guía</h4>
                <div className="flex items-center gap-2 p-3 bg-yellow/20 rounded-lg">
                  <span className="font-mono text-lg font-bold text-brown">{trackingNumber}</span>
                  <Button size="sm" variant="outline" onClick={handleCopyTracking} className="ml-auto">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Guarda este número para hacer seguimiento</p>
              </div>

              <div>
                <h4 className="font-bold text-brown mb-2">Tiempo Estimado</h4>
                <div className="p-3 bg-red/10 rounded-lg">
                  <p className="text-lg font-bold text-red">20-25 minutos</p>
                  <p className="text-sm text-gray-600">Llegada aproximada: {estimatedTime}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-brown mb-2">Entregar a:</h4>
                  <p className="text-brown">{personalData.name}</p>
                  <p className="text-gray-600 text-sm">{personalData.address}</p>
                  <p className="text-gray-600 text-sm">{personalData.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-brown mb-2">Método de Pago:</h4>
                  <p className="text-brown capitalize font-medium">{paymentMethod}</p>
                  <p className="text-yellow font-bold text-lg">${(getTotalPrice() + 3000).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gray-50 border">
            <h3 className="text-lg font-bold text-brown mb-4 text-center">¿Necesitas ayuda?</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-red hover:bg-red/90 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Llamar Restaurante
              </Button>
              <Button className="flex-1 bg-yellow hover:bg-yellow/90 text-brown">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-brown text-brown hover:bg-gray-100"
                onClick={() => setCurrentSection("map")}
              >
                <MapPin className="mr-2 h-5 w-5" />
                Seguir Pedido
              </Button>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-600 mb-4">Recibirás notificaciones sobre el estado de tu pedido</p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-yellow rounded-full mr-2"></div>
                Preparando
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red rounded-full mr-2"></div>
                En camino
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Entregado
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
