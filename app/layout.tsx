import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/app-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pollo Broaster - Domicilios",
  description: "Aplicación de domicilios para restaurante de pollo broaster",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
