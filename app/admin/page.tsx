// app/admin/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Order {
  id: number;
  tracking_number: string;
  customer_name: string;
  customer_address: string;
  total: string; // La DB devuelve numeric como string
  status: "Preparando" | "En camino" | "Entregado" | "Cancelado";
}

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (trackingNumber: string, newStatus: Order["status"]) => {
    // Actualización optimista en la UI
    const originalOrders = [...orders];
    const updatedOrders = orders.map(order => 
      order.tracking_number === trackingNumber ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Llamada a la API
    try {
      const response = await fetch(`/api/orders/${trackingNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
         // Si falla, revertimos el cambio en la UI
        setOrders(originalOrders);
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      setOrders(originalOrders);
      alert("Error de conexión al actualizar el estado");
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Preparando": return "bg-yellow-500";
      case "En camino": return "bg-blue-500";
      case "Entregado": return "bg-green-500";
      case "Cancelado": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Cargando pedidos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-brown">Panel de Domicilios</h1>
            <Button asChild variant="outline">
                <Link href="/">Volver a la App</Link>
            </Button>
        </div>

        <Card>
          <CardHeader><CardTitle>Historial de Pedidos</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead># Guía</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Aún no se han registrado pedidos.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono">{order.tracking_number}</TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>{order.customer_address}</TableCell>
                      <TableCell>${parseFloat(order.total).toLocaleString()}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.tracking_number, value as Order["status"])}
                        >
                          <SelectTrigger className="w-[150px]">
                            <Badge className={`<span class="math-inline">\{getStatusColor\(order\.status\)\} hover\:</span>{getStatusColor(order.status)} text-white`}>
                                <SelectValue />
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Preparando">Preparando</SelectItem>
                            <SelectItem value="En camino">En camino</SelectItem>
                            <SelectItem value="Entregado">Entregado</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}