"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Eye, Clock, CheckCircle, XCircle, Package } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface AdminOrder {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  items: OrderItem[]
  totalAmount: number
  paymentMethod: "cash" | "card" | "online"
  notes?: string
}

const mockOrders: AdminOrder[] = [
  {
    id: "ORD-001",
    customerName: "Nguyen Van A",
    customerEmail: "nguyen.vana@email.com",
    customerPhone: "+84 123 456 789",
    date: "2024-01-15T10:30:00Z",
    status: "preparing",
    items: [
      { id: "1", name: "Pho Bo Special", quantity: 1, price: 120000 },
      { id: "2", name: "Banh Mi Thit Nuong", quantity: 2, price: 45000 },
    ],
    totalAmount: 210000,
    paymentMethod: "online",
    notes: "Extra herbs please",
  },
  {
    id: "ORD-002",
    customerName: "Tran Thi B",
    customerEmail: "tran.thib@email.com",
    customerPhone: "+84 987 654 321",
    date: "2024-01-14T19:45:00Z",
    status: "delivered",
    items: [
      { id: "3", name: "Bun Bo Hue", quantity: 1, price: 110000 },
      { id: "4", name: "Che Ba Mau", quantity: 1, price: 35000 },
    ],
    totalAmount: 145000,
    paymentMethod: "cash",
  },
  {
    id: "ORD-003",
    customerName: "Le Van C",
    customerEmail: "le.vanc@email.com",
    customerPhone: "+84 555 123 456",
    date: "2024-01-13T12:15:00Z",
    status: "pending",
    items: [{ id: "5", name: "Com Tam Suon Nuong", quantity: 1, price: 95000 }],
    totalAmount: 95000,
    paymentMethod: "card",
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: AdminOrder["status"]) => {
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

  const getStatusColor = (status: AdminOrder["status"]) => {
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

  const handleStatusChange = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    })
  }

  const openViewDialog = (order: AdminOrder) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }

  const getOrderStats = () => {
    const pending = orders.filter((o) => o.status === "pending").length
    const preparing = orders.filter((o) => o.status === "preparing").length
    const ready = orders.filter((o) => o.status === "ready").length
    const delivered = orders.filter((o) => o.status === "delivered").length
    return { pending, preparing, ready, delivered }
  }

  const stats = getOrderStats()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight">Orders Management</h2>
        <p className="text-muted-foreground font-sans">Track and manage customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-sans">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-sans">Preparing</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.preparing}</div>
            <p className="text-xs text-muted-foreground">In kitchen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-sans">Ready</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
            <p className="text-xs text-muted-foreground">Ready for pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-sans">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">All Orders</CardTitle>
          <CardDescription className="font-sans">{orders.length} orders total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans">Order ID</TableHead>
                  <TableHead className="font-sans">Customer</TableHead>
                  <TableHead className="font-sans">Date</TableHead>
                  <TableHead className="font-sans">Items</TableHead>
                  <TableHead className="font-sans">Total</TableHead>
                  <TableHead className="font-sans">Payment</TableHead>
                  <TableHead className="font-sans">Status</TableHead>
                  <TableHead className="font-sans">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium font-sans">{order.customerName}</div>
                        <div className="text-sm text-muted-foreground font-sans">{order.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-sans">{formatDate(order.date)}</TableCell>
                    <TableCell className="font-sans">{order.items.length} items</TableCell>
                    <TableCell className="font-sans font-medium">{formatPrice(order.totalAmount)}</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-sans capitalize">
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as AdminOrder["status"])}
                      >
                        <SelectTrigger className="w-32">
                          <Badge className={`${getStatusColor(order.status)} font-sans border-0`}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => openViewDialog(order)} className="font-sans">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif">Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription className="font-sans">Complete order information and customer details</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-serif font-semibold mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {selectedOrder.customerName}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {selectedOrder.customerPhone}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-serif font-semibold mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium">Date:</span> {formatDate(selectedOrder.date)}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span> {selectedOrder.paymentMethod}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <Badge className={`ml-2 ${getStatusColor(selectedOrder.status)} font-sans`}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-serif font-semibold mb-2">Order Items</h4>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-sans">Item</TableHead>
                        <TableHead className="font-sans">Quantity</TableHead>
                        <TableHead className="font-sans">Price</TableHead>
                        <TableHead className="font-sans">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-sans">{item.name}</TableCell>
                          <TableCell className="font-sans">{item.quantity}</TableCell>
                          <TableCell className="font-sans">{formatPrice(item.price)}</TableCell>
                          <TableCell className="font-sans">{formatPrice(item.price * item.quantity)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="font-serif font-semibold">
                          Total Amount:
                        </TableCell>
                        <TableCell className="font-serif font-bold text-primary">
                          {formatPrice(selectedOrder.totalAmount)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-serif font-semibold mb-2">Special Notes</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm font-sans">{selectedOrder.notes}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
