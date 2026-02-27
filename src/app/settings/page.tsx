"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  HelpCircle,
} from "lucide-react";

export default function SettingsPage() {
  const settingsCategories = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account details",
      action: "Edit Profile",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure notification preferences",
      action: "Manage",
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Control your privacy settings",
      action: "Configure",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize the look and feel",
      action: "Customize",
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your language and timezone",
      action: "Change",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact support",
      action: "Get Help",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              A
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Alex Morgan</h2>
              <p className="text-muted-foreground">alex.morgan@vantoos.com</p>
              <p className="text-sm text-muted-foreground mt-1">
                Premium Plan • Member since Jan 2025
              </p>
            </div>
            <Button>Edit Profile</Button>
          </div>
        </Card>

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card
                key={idx}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      {category.action} →
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Account Actions */}
        <Card className="p-6 mt-6">
          <h2 className="font-semibold mb-4">Account Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Deactivate Account
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
