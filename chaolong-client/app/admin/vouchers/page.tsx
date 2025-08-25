"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AdminVoucher {
  id: string;
  name: string;
  code: string;
  description: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  quantity: number;
  usedCount: number;
  expirationDate: string;
  isActive: boolean;
  category: "food" | "drink" | "combo" | "general";
}

const mockVouchers: AdminVoucher[] = [
  {
    id: "V001",
    name: "Welcome Discount",
    code: "WELCOME10",
    description: "10% off your first order at Chao Long Co Tham",
    discountAmount: 10,
    discountType: "percentage",
    quantity: 100,
    usedCount: 25,
    expirationDate: "2024-03-31",
    isActive: true,
    category: "general",
  },
  {
    id: "V002",
    name: "Pho Special Deal",
    code: "PHO50K",
    description: "50,000 VND off any Pho dish",
    discountAmount: 50000,
    discountType: "fixed",
    quantity: 50,
    usedCount: 12,
    expirationDate: "2024-02-28",
    isActive: true,
    category: "food",
  },
  {
    id: "V003",
    name: "Weekend Combo",
    code: "WEEKEND20",
    description: "20% off weekend combo meals",
    discountAmount: 20,
    discountType: "percentage",
    quantity: 30,
    usedCount: 30,
    expirationDate: "2024-02-15",
    isActive: false,
    category: "combo",
  },
];

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<AdminVoucher[]>(mockVouchers);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<AdminVoucher | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<AdminVoucher>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getCategoryColor = (category: AdminVoucher["category"]) => {
    switch (category) {
      case "food":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "drink":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "combo":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "general":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreate = () => {
    const newVoucher: AdminVoucher = {
      id: `V${String(vouchers.length + 1).padStart(3, "0")}`,
      name: formData.name || "",
      code: formData.code || "",
      description: formData.description || "",
      discountAmount: formData.discountAmount || 0,
      discountType: formData.discountType || "percentage",
      quantity: formData.quantity || 0,
      usedCount: 0,
      expirationDate: formData.expirationDate || "",
      isActive: formData.isActive ?? true,
      category: formData.category || "general",
    };
    setVouchers([...vouchers, newVoucher]);
    setIsCreateOpen(false);
    setFormData({});
    toast({
      title: "Voucher Created",
      description: `${newVoucher.name} has been successfully created.`,
    });
  };

  const handleEdit = () => {
    if (!selectedVoucher) return;
    setVouchers(
      vouchers.map((voucher) =>
        voucher.id === selectedVoucher.id
          ? { ...selectedVoucher, ...formData }
          : voucher
      )
    );
    setIsEditOpen(false);
    setSelectedVoucher(null);
    setFormData({});
    toast({
      title: "Voucher Updated",
      description: "Voucher has been successfully updated.",
    });
  };

  const handleDelete = (voucherId: string) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== voucherId));
    toast({
      title: "Voucher Deleted",
      description: "Voucher has been successfully deleted.",
    });
  };

  const openEditDialog = (voucher: AdminVoucher) => {
    setSelectedVoucher(voucher);
    setFormData(voucher);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight">
            Vouchers Management
          </h2>
          <p className="text-muted-foreground font-sans">
            Manage promotional vouchers and discounts
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="font-sans">
              <Plus className="w-4 h-4 mr-2" />
              Add Voucher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">
                Create New Voucher
              </DialogTitle>
              <DialogDescription className="font-sans">
                Add a new promotional voucher
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="font-sans">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="font-sans"
                />
              </div>
              <div>
                <Label htmlFor="code" className="font-sans">
                  Code
                </Label>
                <Input
                  id="code"
                  value={formData.code || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  className="font-sans"
                  placeholder="DISCOUNT10"
                />
              </div>
              <div>
                <Label htmlFor="description" className="font-sans">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discountType" className="font-sans">
                    Discount Type
                  </Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        discountType: value as "percentage" | "fixed",
                      })
                    }
                  >
                    <SelectTrigger className="font-sans">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discountAmount" className="font-sans">
                    {formData.discountType === "percentage"
                      ? "Percentage (%)"
                      : "Amount (VND)"}
                  </Label>
                  <Input
                    id="discountAmount"
                    type="number"
                    value={formData.discountAmount || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountAmount: Number(e.target.value),
                      })
                    }
                    className="font-sans"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="font-sans">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: Number(e.target.value),
                      })
                    }
                    className="font-sans"
                  />
                </div>
                <div>
                  <Label htmlFor="expirationDate" className="font-sans">
                    Expiration Date
                  </Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expirationDate: e.target.value,
                      })
                    }
                    className="font-sans"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category" className="font-sans">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value as AdminVoucher["category"],
                    })
                  }
                >
                  <SelectTrigger className="font-sans">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="drink">Drink</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="font-sans"
              >
                Cancel
              </Button>
              <Button onClick={handleCreate} className="font-sans">
                Create Voucher
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">All Vouchers</CardTitle>
          <CardDescription className="font-sans">
            {vouchers.length} vouchers created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans">Name</TableHead>
                  <TableHead className="font-sans">Code</TableHead>
                  <TableHead className="font-sans">Discount</TableHead>
                  <TableHead className="font-sans">Usage</TableHead>
                  <TableHead className="font-sans">Category</TableHead>
                  <TableHead className="font-sans">Expiration</TableHead>
                  <TableHead className="font-sans">Status</TableHead>
                  <TableHead className="font-sans">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>
                      <div className="font-medium font-sans">
                        {voucher.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-sans line-clamp-1">
                        {voucher.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {voucher.code}
                      </code>
                    </TableCell>
                    <TableCell className="font-sans">
                      {voucher.discountType === "percentage"
                        ? `${voucher.discountAmount}%`
                        : formatPrice(voucher.discountAmount)}
                    </TableCell>
                    <TableCell className="font-sans">
                      {voucher.usedCount} / {voucher.quantity}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getCategoryColor(
                          voucher.category
                        )} font-sans`}
                      >
                        {voucher.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-sans">
                      {formatDate(voucher.expirationDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          voucher.isActive
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {voucher.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(voucher)}
                          className="font-sans"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-sans text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-serif">
                                Delete Voucher
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-sans">
                                Are you sure you want to delete &quot;
                                {voucher.name}&quot;? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="font-sans">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(voucher.id)}
                                className="font-sans bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog - Similar structure to create dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit Voucher</DialogTitle>
            <DialogDescription className="font-sans">
              Update voucher information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name" className="font-sans">
                Name
              </Label>
              <Input
                id="edit-name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="font-sans"
              />
            </div>
            <div>
              <Label htmlFor="edit-code" className="font-sans">
                Code
              </Label>
              <Input
                id="edit-code"
                value={formData.code || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    code: e.target.value.toUpperCase(),
                  })
                }
                className="font-sans"
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="font-sans">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="font-sans"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-quantity" className="font-sans">
                  Quantity
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: Number(e.target.value),
                    })
                  }
                  className="font-sans"
                />
              </div>
              <div>
                <Label htmlFor="edit-expirationDate" className="font-sans">
                  Expiration Date
                </Label>
                <Input
                  id="edit-expirationDate"
                  type="date"
                  value={formData.expirationDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, expirationDate: e.target.value })
                  }
                  className="font-sans"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="font-sans"
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} className="font-sans">
              Update Voucher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
