"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Ticket, Gift, Calendar, Percent } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Voucher {
  id: string;
  name: string;
  code: string;
  description: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  quantity: number;
  expirationDate: string;
  isRedeemed: boolean;
  category: "food" | "drink" | "combo" | "general";
}

const mockVouchers: Voucher[] = [
  {
    id: "V001",
    name: "Welcome Discount",
    code: "WELCOME10",
    description: "10% off your first order at Chao Long Co Tham",
    discountAmount: 10,
    discountType: "percentage",
    quantity: 1,
    expirationDate: "2024-03-31",
    isRedeemed: false,
    category: "general",
  },
  {
    id: "V002",
    name: "Pho Special Deal",
    code: "PHO50K",
    description: "50,000 VND off any Pho dish",
    discountAmount: 50000,
    discountType: "fixed",
    quantity: 2,
    expirationDate: "2024-02-28",
    isRedeemed: false,
    category: "food",
  },
  {
    id: "V003",
    name: "Weekend Combo",
    code: "WEEKEND20",
    description: "20% off weekend combo meals",
    discountAmount: 20,
    discountType: "percentage",
    quantity: 1,
    expirationDate: "2024-02-15",
    isRedeemed: true,
    category: "combo",
  },
  {
    id: "V004",
    name: "Free Drink",
    code: "FREEDRINK",
    description: "Complimentary Vietnamese iced coffee with any main dish",
    discountAmount: 25000,
    discountType: "fixed",
    quantity: 3,
    expirationDate: "2024-04-30",
    isRedeemed: false,
    category: "drink",
  },
  {
    id: "V005",
    name: "Loyalty Reward",
    code: "LOYAL15",
    description: "15% off for loyal customers",
    discountAmount: 15,
    discountType: "percentage",
    quantity: 1,
    expirationDate: "2024-01-20",
    isRedeemed: false,
    category: "general",
  },
];

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(mockVouchers);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const getCategoryColor = (category: Voucher["category"]) => {
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

  const handleRedeemVoucher = (voucherId: string) => {
    setVouchers((prevVouchers) =>
      prevVouchers.map((voucher) =>
        voucher.id === voucherId
          ? {
              ...voucher,
              isRedeemed: true,
              quantity: Math.max(0, voucher.quantity - 1),
            }
          : voucher
      )
    );
    const voucher = vouchers.find((v) => v.id === voucherId);
    toast({
      title: "Voucher Redeemed!",
      description: `${voucher?.name} has been successfully redeemed. Code: ${voucher?.code}`,
    });
  };

  const canRedeem = (voucher: Voucher) => {
    return (
      !voucher.isRedeemed &&
      voucher.quantity > 0 &&
      !isExpired(voucher.expirationDate)
    );
  };

  const availableVouchers = vouchers.filter(
    (v) => !v.isRedeemed && v.quantity > 0 && !isExpired(v.expirationDate)
  );
  const redeemedVouchers = vouchers.filter((v) => v.isRedeemed);
  const expiredVouchers = vouchers.filter(
    (v) => !v.isRedeemed && isExpired(v.expirationDate)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <Ticket className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">
                My Vouchers
              </h1>
              <p className="text-muted-foreground font-sans mt-2">
                Discover and redeem exclusive offers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vouchers Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">
                Available Vouchers
              </CardTitle>
              <Gift className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {availableVouchers.length}
              </div>
              <p className="text-xs text-muted-foreground">Ready to use</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">
                Redeemed
              </CardTitle>
              <Ticket className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {redeemedVouchers.length}
              </div>
              <p className="text-xs text-muted-foreground">Successfully used</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-sans">
                Expired
              </CardTitle>
              <Calendar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {expiredVouchers.length}
              </div>
              <p className="text-xs text-muted-foreground">No longer valid</p>
            </CardContent>
          </Card>
        </div>

        {/* Vouchers Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">All Vouchers</CardTitle>
            <CardDescription className="font-sans">
              Manage your vouchers and redeem exclusive offers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-sans">Name</TableHead>
                    <TableHead className="font-sans">Code</TableHead>
                    <TableHead className="font-sans">Description</TableHead>
                    <TableHead className="font-sans">Discount</TableHead>
                    <TableHead className="font-sans">Quantity</TableHead>
                    <TableHead className="font-sans">Expiration</TableHead>
                    <TableHead className="font-sans">Status</TableHead>
                    <TableHead className="font-sans">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vouchers.map((voucher) => (
                    <TableRow key={voucher.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${getCategoryColor(
                              voucher.category
                            )} font-sans text-xs`}
                          >
                            {voucher.category}
                          </Badge>
                          <span className="font-medium font-sans">
                            {voucher.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {voucher.code}
                        </code>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-muted-foreground font-sans line-clamp-2">
                          {voucher.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Percent className="w-4 h-4 text-primary" />
                          <span className="font-medium font-sans">
                            {voucher.discountType === "percentage"
                              ? `${voucher.discountAmount}%`
                              : formatPrice(voucher.discountAmount)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-sans">{voucher.quantity}</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-sans ${
                            isExpired(voucher.expirationDate)
                              ? "text-red-600"
                              : "text-foreground"
                          }`}
                        >
                          {formatDate(voucher.expirationDate)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {voucher.isRedeemed ? (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-sans">
                            Redeemed
                          </Badge>
                        ) : isExpired(voucher.expirationDate) ? (
                          <Badge className="bg-red-100 text-red-800 border-red-200 font-sans">
                            Expired
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 border-green-200 font-sans">
                            Available
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {canRedeem(voucher) ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" className="font-sans">
                                Redeem
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-serif">
                                  Redeem Voucher
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-sans">
                                  Are you sure you want to redeem &quot;
                                  {voucher.name}&quot;? This action cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="font-sans">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleRedeemVoucher(voucher.id)
                                  }
                                  className="font-sans"
                                >
                                  Redeem Now
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="font-sans bg-transparent"
                          >
                            {voucher.isRedeemed
                              ? "Used"
                              : isExpired(voucher.expirationDate)
                              ? "Expired"
                              : "Unavailable"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-serif">How to Use Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-serif font-semibold">Redeeming Vouchers</h4>
                <p className="text-sm text-muted-foreground font-sans">
                  Click the &quot;Redeem&quot; button to activate your voucher.
                  Once redeemed, you&quot;ll receive a confirmation with the
                  voucher code to use during checkout.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif font-semibold">Voucher Types</h4>
                <p className="text-sm text-muted-foreground font-sans">
                  Vouchers can offer percentage discounts or fixed amount
                  reductions. Check the expiration date and quantity available
                  before redeeming.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
