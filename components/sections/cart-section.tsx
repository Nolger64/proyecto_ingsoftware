"use client"

import { motion } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Minus, Plus, Trash2, ArrowRight } from "lucide-react"

export default function CartSection() {
  const { setCurrentSection, cart, removeFromCart, updateQuantity, getTotalPrice } = useAppContext()

  const handleContinue = () => {
    if (cart.length > 0) {
      setCurrentSection("personal")
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
          onClick={() => setCurrentSection("products")}
          className="bg-white hover:bg-gray-50 text-brown border-brown"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Seguir Comprando
        </Button>
        <h1 className="text-2xl font-bold text-brown">Mi Carrito</h1>
        <div className="w-[140px]"></div>
      </motion.div>

      {cart.length === 0 ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-brown mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">¡Agrega algunos productos deliciosos!</p>
          <Button
            onClick={() => setCurrentSection("products")}
            className="bg-yellow hover:bg-yellow/90 text-brown shadow-lg"
          >
            Ver Productos
          </Button>
        </motion.div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto mb-6">
            <motion.div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 bg-white border shadow-md">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-lg bg-gray-100"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-brown">{item.name}</h3>
                        <p className="text-yellow font-bold">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 p-0 text-red hover:bg-red hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-4 shadow-lg border"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-brown">Total:</span>
              <span className="text-2xl font-bold text-yellow">${getTotalPrice().toLocaleString()}</span>
            </div>
            <Button
              onClick={handleContinue}
              className="w-full h-12 bg-red hover:bg-red/90 text-white text-lg shadow-lg"
            >
              Continuar con el Pedido
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
