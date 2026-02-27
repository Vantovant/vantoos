"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Mail,
  MoreHorizontal,
} from "lucide-react";

const mobileMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Mail, label: "Email", href: "/email" },
  { icon: MoreHorizontal, label: "More", href: "/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {mobileMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className="flex flex-col items-center gap-1 py-2">
                <Icon
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
