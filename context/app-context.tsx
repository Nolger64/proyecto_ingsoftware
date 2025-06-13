"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Section = "home" | "map" | "products" | "personal" | "completed" | "cart"

type PaymentMethod = "efectivo" | "tarjeta" | "transferencia" | null

interface Product {
  id: number
  name: string
  price: number
  image: string
  type: "combo" | "individual" | "bebida" | "adicional"
  description: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface PersonalData {
  name: string
  address: string
  phone: string
  email: string
}

interface AppContextType {
  currentSection: Section
  setCurrentSection: (section: Section) => void
  products: Product[]
  filteredProducts: Product[]
  filterProducts: (type: string | null, sortBy: "asc" | "desc" | null) => void
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  personalData: PersonalData
  updatePersonalData: (data: Partial<PersonalData>) => void
  getTotalPrice: () => number
  paymentMethod: PaymentMethod
  setPaymentMethod: (method: PaymentMethod) => void
  trackingNumber: string
  setTrackingNumber: (number: string) => void
  generateTrackingNumber: () => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>("home")
  const [cart, setCart] = useState<CartItem[]>([])
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: "",
    address: "",
    phone: "",
    email: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [trackingNumber, setTrackingNumber] = useState("")

  const generateTrackingNumber = () => {
    const number = `PB${Date.now().toString().slice(-6)}`
    setTrackingNumber(number)
    return number
  }

  // Datos de ejemplo para productos con imágenes actualizadas
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Combo Familiar",
      price: 45000,
      image: "/images/combo-familiar.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "combo",
      description: "1 pollo entero + 2 porciones de papas + 4 gaseosas",
    },
    {
      id: 2,
      name: "Combo Personal",
      price: 18000,
      image: "/images/combo-personal.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "combo",
      description: "2 presas + 1 porción de papas + 1 gaseosa",
    },
    {
      id: 3,
      name: "Presas Sueltas x2",
      price: 12000,
      image: "/images/presas-individuales.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "individual",
      description: "2 presas de pollo broaster",
    },
    {
      id: 4,
      name: "Gaseosa Personal",
      price: 3500,
      image: "/images/gaseosa.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "bebida",
      description: "Gaseosa personal 350ml",
    },
    {
      id: 5,
      name: "Papas Grandes",
      price: 8000,
      image: "/images/papas-grandes.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "adicional",
      description: "Porción grande de papas fritas",
    },
    {
      id: 6,
      name: "Combo Pareja",
      price: 32000,
      image: "/images/combo-pareja.png", // [*] Ruta de imagen de ejemplo. Reemplázala con tu imagen.
      type: "combo",
      description: "1/2 pollo + 2 porciones de papas + 2 gaseosas",
    },
  ])

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const filterProducts = (type: string | null, sortBy: "asc" | "desc" | null) => {
    let filtered = [...products]

    if (type) {
      filtered = filtered.filter((product) => product.type === type)
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "asc") {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    }

    setFilteredProducts(filtered)
  }

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
          },
        ]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const updatePersonalData = (data: Partial<PersonalData>) => {
    setPersonalData((prev) => ({ ...prev, ...data }))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <AppContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        products,
        filteredProducts,
        filterProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        personalData,
        updatePersonalData,
        getTotalPrice,
        paymentMethod,
        setPaymentMethod,
        trackingNumber,
        setTrackingNumber,
        generateTrackingNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}