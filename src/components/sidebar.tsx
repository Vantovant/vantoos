"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Mail,
  DollarSign,
  Plane,
  ShoppingCart,
  Settings,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Mail, label: "Email", href: "/email" },
  { icon: DollarSign, label: "Finance", href: "/finance" },
  { icon: Plane, label: "Travel", href: "/travel" },
  { icon: ShoppingCart, label: "Shopping", href: "/shopping" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 hidden lg:flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            VantoOS
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={() => setDarkMode(!darkMode)}
          className={cn(
            "hover:bg-secondary transition-all",
            collapsed ? "" : "w-full justify-start"
          )}
        >
          {darkMode ? (
            <>
              <Sun className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Dark Mode</span>}
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
