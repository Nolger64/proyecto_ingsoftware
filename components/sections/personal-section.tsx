"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, MapPin, Phone, Mail, ArrowRight } from "lucide-react"

export default function PersonalSection() {
  const { setCurrentSection, personalData, updatePersonalData, cart, getTotalPrice } = useAppContext()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    updatePersonalData({ [field]: value })
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!personalData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!personalData.address.trim()) {
      newErrors.address = "La dirección es requerida"
    }

    if (!personalData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    } else if (!/^\d{10}$/.test(personalData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "El teléfono debe tener 10 dígitos"
    }

    if (!personalData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email)) {
      newErrors.email = "El email no es válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setCurrentSection("payment")
    }
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
          onClick={() => setCurrentSection("cart")}
          className="bg-white hover:bg-gray-50 text-brown border-brown"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Modificar Carrito
        </Button>
        <h1 className="text-2xl font-bold text-brown">Datos de Entrega</h1>
        <div className="w-[140px]"></div>
      </motion.div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <Card className="p-6 bg-white border shadow-lg h-full">
            <h2 className="text-xl font-bold text-brown mb-6 flex items-center">
              <User className="mr-2 h-6 w-6" />
              Información Personal
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-brown font-medium">
                  Nombre Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={personalData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`mt-1 ${errors.name ? "border-red" : ""}`}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.name && <p className="text-red text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="address" className="text-brown font-medium flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  Dirección de Entrega *
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={personalData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`mt-1 ${errors.address ? "border-red" : ""}`}
                  placeholder="Calle, número, barrio, referencias"
                />
                {errors.address && <p className="text-red text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-brown font-medium flex items-center">
                  <Phone className="mr-1 h-4 w-4" />
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={personalData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`mt-1 ${errors.phone ? "border-red" : ""}`}
                  placeholder="3001234567"
                />
                {errors.phone && <p className="text-red text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-brown font-medium flex items-center">
                  <Mail className="mr-1 h-4 w-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={personalData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`mt-1 ${errors.email ? "border-red" : ""}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:w-80"
        >
          <Card className="p-6 bg-white border shadow-lg">
            <h2 className="text-xl font-bold text-brown mb-4">Resumen del Pedido</h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-brown text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-yellow">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-brown">Subtotal:</span>
                <span className="font-bold text-brown">${getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-brown">Domicilio:</span>
                <span className="font-bold text-brown">$3.000</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-brown">Total:</span>
                <span className="font-bold text-yellow">${(getTotalPrice() + 3000).toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full h-12 bg-red hover:bg-red/90 text-white text-lg shadow-lg">
              Continuar al Pago
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
