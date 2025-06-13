"use client"

import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CreditCard, Banknote, Smartphone, ArrowRight } from "lucide-react"

export default function PaymentSection() {
  const {
    setCurrentSection,
    paymentMethod,
    setPaymentMethod,
    cart,
    getTotalPrice,
    generateTrackingNumber,
    personalData, // Importante: necesitamos los datos personales
    clearCart,    // Importante: para limpiar el carrito tras el pedido
  } = useAppContext()

  const handlePaymentSelect = (method: "efectivo" | "tarjeta" | "transferencia") => {
    setPaymentMethod(method)
  }

  const handleConfirmOrder = async () => {
    if (!paymentMethod) return;

    // 1. Genera el número de seguimiento para usarlo en la UI y en la DB
    const newTrackingNumber = generateTrackingNumber();

    // 2. Prepara los datos del pedido que se enviarán a la API
    const orderPayload = {
      trackingNumber: newTrackingNumber,
      customer: { ...personalData },
      items: [...cart],
      total: getTotalPrice() + 3000, // Se asume un costo de domicilio de 3000
      paymentMethod: paymentMethod,
    };

    try {
      // 3. Llama a la API para guardar el pedido en la base de datos
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        // Si la respuesta de la API no es exitosa, muestra un error
        throw new Error('La creación del pedido falló');
      }

      // 4. Si todo sale bien, avanza a la pantalla de completado y limpia el carrito
      setCurrentSection("completed");
      clearCart();

    } catch (error) {
      console.error("Error al crear la orden:", error);
      // Informa al usuario que algo salió mal
      alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
    }
  };


  const paymentOptions = [
    {
      id: "efectivo",
      name: "Efectivo",
      description: "Paga al recibir tu pedido",
      icon: Banknote,
      color: "bg-yellow hover:bg-yellow/90",
    },
    {
      id: "tarjeta",
      name: "Tarjeta",
      description: "Débito o crédito",
      icon: CreditCard,
      color: "bg-red hover:bg-red/90",
    },
    {
      id: "transferencia",
      name: "Transferencia",
      description: "Nequi, Daviplata, Bancolombia",
      icon: Smartphone,
      color: "bg-brown hover:bg-brown/90",
    },
  ]

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
          onClick={() => setCurrentSection("personal")}
          className="bg-white hover:bg-gray-50 text-brown border-brown"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Datos Personales
        </Button>
        <h1 className="text-2xl font-bold text-brown">Método de Pago</h1>
        <div className="w-[140px]"></div>
      </motion.div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-brown mb-6">Selecciona tu método de pago</h2>

            {paymentOptions.map((option, index) => {
              const IconComponent = option.icon
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all border-2 ${
                      paymentMethod === option.id
                        ? "border-yellow bg-yellow/10 shadow-lg"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => handlePaymentSelect(option.id as "efectivo" | "tarjeta" | "transferencia")}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${option.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-brown text-lg">{option.name}</h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          paymentMethod === option.id ? "border-yellow bg-yellow" : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === option.id && (
                          <div className="w-full h-full rounded-full bg-yellow flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}

            {paymentMethod === "transferencia" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4">
                <Card className="p-4 bg-gray-50 border">
                  <h4 className="font-bold text-brown mb-2">Datos para transferencia:</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Nequi:</strong> 300 123 4567
                    </p>
                    <p>
                      <strong>Daviplata:</strong> 300 123 4567
                    </p>
                    <p>
                      <strong>Bancolombia:</strong> 123-456789-01
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:w-80"
        >
          <Card className="p-6 bg-white border shadow-lg">
            <h2 className="text-xl font-bold text-brown mb-4">Resumen Final</h2>

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
              <div className="flex justify-between items-center text-lg mb-4">
                <span className="font-bold text-brown">Total:</span>
                <span className="font-bold text-yellow">${(getTotalPrice() + 3000).toLocaleString()}</span>
              </div>

              {paymentMethod && (
                <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded">
                  <span className="text-brown">Método de pago:</span>
                  <span className="font-bold text-brown capitalize">{paymentMethod}</span>
                </div>
              )}
            </div>

            <Button
              onClick={handleConfirmOrder}
              disabled={!paymentMethod}
              className="w-full h-12 bg-red hover:bg-red/90 text-white text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Pedido
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}