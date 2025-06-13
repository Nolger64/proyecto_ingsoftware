"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, ArrowUpDown, Loader2, ShoppingCart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsSection() {
  const { setCurrentSection, products, filteredProducts, filterProducts, addToCart, cart } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("todos")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setIsLoading(true)

    setTimeout(() => {
      if (value === "todos") {
        filterProducts(null, sortOrder)
      } else {
        filterProducts(value, sortOrder)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order)
    setIsLoading(true)

    setTimeout(() => {
      if (activeTab === "todos") {
        filterProducts(null, order)
      } else {
        filterProducts(activeTab, order)
      }
      setIsLoading(false)
    }, 500)
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
        <h1 className="text-2xl font-bold text-brown">Nuestro Menú</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentSection("cart")}
            className="bg-white hover:bg-gray-50 text-brown border-brown relative"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red text-white min-w-[20px] h-5 flex items-center justify-center p-0 text-xs">
                {cart.length}
              </Badge>
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-brown border-brown">
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("asc")}>Precio: Menor a Mayor</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("desc")}>Precio: Mayor a Menor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <Tabs defaultValue="todos" onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-4 bg-gray-100">
            <TabsTrigger value="todos" className="data-[state=active]:bg-yellow data-[state=active]:text-brown">
              Todos
            </TabsTrigger>
            <TabsTrigger value="combo" className="data-[state=active]:bg-yellow data-[state=active]:text-brown">
              Combos
            </TabsTrigger>
            <TabsTrigger value="individual" className="data-[state=active]:bg-yellow data-[state=active]:text-brown">
              Individual
            </TabsTrigger>
            <TabsTrigger value="adicional" className="data-[state=active]:bg-yellow data-[state=active]:text-brown">
              Adicionales
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-red mb-2" />
              <p className="text-brown">Cargando productos...</p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto pb-4"
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full bg-white border shadow-md hover:shadow-lg transition-all">
                    <div className="aspect-video relative overflow-hidden">
                      <div
                        className="w-full h-full bg-gray-100"
                        style={{
                          backgroundImage: `url(${product.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="absolute top-2 right-2 bg-yellow text-brown px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ${product.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-brown mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <Button
                        onClick={() => addToCart(product)}
                        className="w-full bg-red hover:bg-red/90 text-white shadow-lg hover:shadow-xl transition-all"
                      >
                        Agregar al carrito
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
