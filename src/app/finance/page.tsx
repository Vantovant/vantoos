"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet } from "lucide-react";

export default function FinancePage() {
  const transactions = [
    {
      name: "Client Payment - Acme Corp",
      amount: "+R5,200",
      type: "income",
      date: "Feb 24, 2026",
      category: "Revenue",
    },
    {
      name: "Office Rent",
      amount: "-R2,400",
      type: "expense",
      date: "Feb 23, 2026",
      category: "Operations",
    },
    {
      name: "Software Subscriptions",
      amount: "-R450",
      type: "expense",
      date: "Feb 22, 2026",
      category: "Technology",
    },
    {
      name: "Freelance Project",
      amount: "+R1,800",
      type: "income",
      date: "Feb 21, 2026",
      category: "Revenue",
    },
    {
      name: "Marketing Campaign",
      amount: "-R890",
      type: "expense",
      date: "Feb 20, 2026",
      category: "Marketing",
    },
  ];

  const monthlyData = [
    { month: "Jan", income: 10200, expenses: 7800 },
    { month: "Feb", income: 12450, expenses: 8230 },
    { month: "Mar", income: 11800, expenses: 7950 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Finance</h1>
          <p className="text-muted-foreground">
            Track your income and expenses
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <p className="text-sm text-muted-foreground">Monthly Income</p>
            </div>
            <p className="text-3xl font-bold mb-2">R12,450</p>
            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </Badge>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
            </div>
            <p className="text-3xl font-bold mb-2">R8,230</p>
            <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5% from last month
            </Badge>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">Current Balance</p>
            </div>
            <p className="text-3xl font-bold mb-2 text-primary">R24,890</p>
            <p className="text-sm text-muted-foreground">Available funds</p>
          </Card>
        </div>

        {/* Chart */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-6">Income vs Expenses</h2>
          <div className="h-64 flex items-end justify-around gap-4">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-2 items-end justify-center h-48">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-green-500/20 rounded-t-lg relative group cursor-pointer hover:bg-green-500/30 transition-colors"
                      style={{
                        height: `${(data.income / 15000) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        R{data.income.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Income</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-red-500/20 rounded-t-lg relative group cursor-pointer hover:bg-red-500/30 transition-colors"
                      style={{
                        height: `${(data.expenses / 15000) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        R{data.expenses.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Expenses</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">{data.month}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {transactions.map((transaction, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-bold text-lg ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
