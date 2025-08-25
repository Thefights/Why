"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Clock, CheckCircle, XCircle, Package, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  items: OrderItem[]
  totalAmount: number
  estimatedTime?: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15T10:30:00Z",
    status: "preparing",
    items: [
      { id: "1", name: "Pho Bo Special", quantity: 1, price: 120000 },
      { id: "2", name: "Banh Mi Thit Nuong", quantity: 2, price: 45000 },
    ],
    totalAmount: 210000,
    estimatedTime: "15 minutes",
  },
  {
    id: "ORD-002",
    date: "2024-01-14T19:45:00Z",
    status: "delivered",
    items: [
      { id: "3", name: "Bun Bo Hue", quantity: 1, price: 110000 },
      { id: "4", name: "Che Ba Mau", quantity: 1, price: 35000 },
    ],
    totalAmount: 145000,
  },
  {
    id: "ORD-003",
    date: "2024-01-13T12:15:00Z",
    status: "pending",
    items: [{ id: "5", name: "Com Tam Suon Nuong", quantity: 1, price: 95000 }],
    totalAmount: 95000,
    estimatedTime: "20 minutes",
  },
  {
    id: "ORD-004",
    date: "2024-01-12T18:20:00Z",
    status: "cancelled",
    items: [{ id: "6", name: "Goi Cuon", quantity: 4, price: 25000 }],
    totalAmount: 100000,
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "preparing":
        return <Package className="w-4 h-4" />
      case "ready":
        return <CheckCircle className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ready":
        return "bg-green-100 text-green-800 border-green-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const canCancelOrder = (status: Order["status"]) => {
    return status === "pending" || status === "preparing"
  }

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, status: "cancelled" as const } : order)),
    )
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been successfully cancelled.`,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground font-sans mt-2">Track and manage your order history</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-serif font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground font-sans text-center mb-4">
                  You haven't placed any orders yet. Start exploring our delicious Vietnamese cuisine!
                </p>
                <Button className="font-sans">Browse Menu</Button>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-serif flex items-center gap-2">
                        Order #{order.id}
                        <Badge className={`${getStatusColor(order.status)} font-sans`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="font-sans">
                        {formatDate(order.date)}
                        {order.estimatedTime && (
                          <span className="ml-2 text-primary">• Estimated: {order.estimatedTime}</span>
                        )}
                      </CardDescription>
                    </div>
                    {canCancelOrder(order.status) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="font-sans bg-transparent">
                            <X className="w-4 h-4 mr-2" />
                            Cancel Order
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-serif">Cancel Order</AlertDialogTitle>
                            <AlertDialogDescription className="font-sans">
                              Are you sure you want to cancel order #{order.id}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="font-sans">Keep Order</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelOrder(order.id)} className="font-sans">
                              Cancel Order
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className="font-sans font-medium">{item.name}</span>
                            <span className="text-muted-foreground font-sans ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-sans font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Total */}
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-semibold text-lg">Total Amount:</span>
                      <span className="font-serif font-bold text-lg text-primary">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>

                    {/* Order Status Info */}
                    {order.status === "preparing" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 font-sans text-sm">
                          Your order is being prepared in our kitchen. Estimated completion: {order.estimatedTime}
                        </p>
                      </div>
                    )}
                    {order.status === "ready" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 font-sans text-sm">
                          Your order is ready for pickup! Please come to collect it.
                        </p>
                      </div>
                    )}
                    {order.status === "delivered" && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 font-sans text-sm">
                          Order delivered successfully. Thank you for choosing Chao Long Co Tham!
                        </p>
                      </div>
                    )}
                    {order.status === "cancelled" && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-800 font-sans text-sm">
                          This order has been cancelled. If you have any questions, please contact us.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
