"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Plus, ShoppingBag } from "lucide-react";

export default function ShoppingPage() {
  const shoppingLists = [
    { item: "Standing desk", checked: false, category: "Office" },
    { item: "Ergonomic chair", checked: false, category: "Office" },
    { item: "Wireless keyboard", checked: true, category: "Tech" },
    { item: "Monitor arm", checked: false, category: "Office" },
    { item: "Noise-canceling headphones", checked: false, category: "Tech" },
  ];

  const recentOrders = [
    {
      order: "#12345",
      items: "MacBook Pro 16-inch",
      total: "R2,499",
      status: "Delivered",
      date: "Feb 20, 2026",
    },
    {
      order: "#12344",
      items: "AirPods Pro, iPhone Case",
      total: "R289",
      status: "In Transit",
      date: "Feb 22, 2026",
    },
    {
      order: "#12343",
      items: "Office Chair",
      total: "R599",
      status: "Processing",
      date: "Feb 24, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Shopping</h1>
            <p className="text-muted-foreground">
              Manage your shopping lists and orders
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shopping List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shopping List</h2>
            <Card className="p-6">
              <div className="space-y-3">
                {shoppingLists.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border-2 cursor-pointer ${
                        item.checked
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}
                    >
                      {item.checked && (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={
                          item.checked
                            ? "text-muted-foreground line-through"
                            : "font-medium"
                        }
                      >
                        {item.item}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            order.status === "Delivered"
                              ? "bg-green-500/10"
                              : order.status === "In Transit"
                                ? "bg-blue-500/10"
                                : "bg-yellow-500/10"
                          }`}
                        >
                          <Package
                            className={`h-5 w-5 ${
                              order.status === "Delivered"
                                ? "text-green-500"
                                : order.status === "In Transit"
                                  ? "text-blue-500"
                                  : "text-yellow-500"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{order.order}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered" ? "default" : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{order.items}</p>
                    <p className="font-bold text-primary">{order.total}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
