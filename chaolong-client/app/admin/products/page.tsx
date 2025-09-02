"use client";

import { useEffect, useState } from "react";
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
import Image from "next/image";
import { fetchProducts } from "@/app/apis/product-api";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "main" | "dessert" | "drink";
  image: string;
  isAvailable: boolean;
  isPopular: boolean;
}

const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Pho Bo Special",
    description: "Traditional Vietnamese beef noodle soup with premium cuts",
    price: 120000,
    category: "main",
    image: "/pho-bo.png",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "P002",
    name: "Banh Mi Thit Nuong",
    description: "Grilled pork Vietnamese sandwich with fresh herbs",
    price: 45000,
    category: "main",
    image: "/delicious-banh-mi.png",
    isAvailable: true,
    isPopular: false,
  },
  {
    id: "P003",
    name: "Goi Cuon",
    description: "Fresh spring rolls with shrimp and herbs",
    price: 25000,
    category: "appetizer",
    image: "/fresh-spring-rolls.png",
    isAvailable: true,
    isPopular: true,
  },
  {
    id: "P004",
    name: "Che Ba Mau",
    description: "Three-color Vietnamese dessert with beans and coconut",
    price: 35000,
    category: "dessert",
    image: "/che-ba-mau.png",
    isAvailable: false,
    isPopular: false,
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getCategoryColor = (category: Product["category"]) => {
    switch (category) {
      case "appetizer":
        return "bg-green-100 text-green-800 border-green-200";
      case "main":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "dessert":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "drink":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreate = () => {
    const newProduct: Product = {
      id: `P${String(products.length + 1).padStart(3, "0")}`,
      name: formData.name || "",
      description: formData.description || "",
      price: formData.price || 0,
      category: formData.category || "main",
      image: formData.image || "/diverse-food-spread.png",
      isAvailable: formData.isAvailable ?? true,
      isPopular: formData.isPopular ?? false,
    };
    setProducts([...products, newProduct]);
    setIsCreateOpen(false);
    setFormData({});
    toast({
      title: "Product Created",
      description: `${newProduct.name} has been successfully created.`,
    });
  };

  const handleEdit = () => {
    if (!selectedProduct) return;
    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id
          ? { ...selectedProduct, ...formData }
          : product
      )
    );
    setIsEditOpen(false);
    setSelectedProduct(null);
    setFormData({});
    toast({
      title: "Product Updated",
      description: "Product has been successfully updated.",
    });
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been successfully deleted.",
    });
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight">
            Products Management
          </h2>
          <p className="text-muted-foreground font-sans">
            Manage your restaurant menu items
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="font-sans">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif">
                Create New Product
              </DialogTitle>
              <DialogDescription className="font-sans">
                Add a new item to your menu
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
              <div>
                <Label htmlFor="price" className="font-sans">
                  Price (VND)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="font-sans"
                />
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
                      category: value as Product["category"],
                    })
                  }
                >
                  <SelectTrigger className="font-sans">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="main">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="drink">Drink</SelectItem>
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
                Create Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">All Products</CardTitle>
          <CardDescription className="font-sans">
            {products.length} products in your menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-sans">Image</TableHead>
                  <TableHead className="font-sans">Name</TableHead>
                  <TableHead className="font-sans">Category</TableHead>
                  <TableHead className="font-sans">Price</TableHead>
                  <TableHead className="font-sans">Status</TableHead>
                  <TableHead className="font-sans">Popular</TableHead>
                  <TableHead className="font-sans">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium font-sans">
                          {product.name}
                        </div>
                        <div className="text-sm text-muted-foreground font-sans line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getCategoryColor(
                          product.category
                        )} font-sans`}
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-sans">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.isAvailable
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {product.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.isPopular && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-sans">
                          Popular
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
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
                                Delete Product
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-sans">
                                Are you sure you want to delete &quot;
                                {product.name}
                                &quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="font-sans">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Edit Product</DialogTitle>
            <DialogDescription className="font-sans">
              Update product information
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
            <div>
              <Label htmlFor="edit-price" className="font-sans">
                Price (VND)
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="font-sans"
              />
            </div>
            <div>
              <Label htmlFor="edit-category" className="font-sans">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    category: value as Product["category"],
                  })
                }
              >
                <SelectTrigger className="font-sans">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appetizer">Appetizer</SelectItem>
                  <SelectItem value="main">Main Course</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="drink">Drink</SelectItem>
                </SelectContent>
              </Select>
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
              Update Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
