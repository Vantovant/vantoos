"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Archive, Trash2, Sparkles } from "lucide-react";

export default function EmailPage() {
  const emails = [
    {
      from: "Sarah Johnson",
      subject: "Q1 Budget Approval Needed",
      preview:
        "Hi Alex, I hope you're doing well. I wanted to reach out regarding the Q1 budget that needs your approval...",
      time: "10:30 AM",
      unread: true,
      starred: true,
      priority: "high",
    },
    {
      from: "Marketing Team",
      subject: "Campaign Performance Update",
      preview:
        "Our latest email campaign exceeded expectations with a 34% open rate and 12% click-through rate...",
      time: "9:15 AM",
      unread: true,
      starred: false,
      priority: "medium",
    },
    {
      from: "John Smith",
      subject: "Project Timeline Adjustment",
      preview:
        "I wanted to discuss the possibility of adjusting our project timeline. Due to recent changes...",
      time: "Yesterday",
      unread: false,
      starred: false,
      priority: "medium",
    },
    {
      from: "HR Department",
      subject: "Benefits Enrollment Deadline",
      preview:
        "This is a friendly reminder that the benefits enrollment period closes on Friday...",
      time: "Yesterday",
      unread: false,
      starred: true,
      priority: "low",
    },
    {
      from: "Client Services",
      subject: "New Client Onboarding",
      preview:
        "We have three new clients scheduled for onboarding next week. Here are the details...",
      time: "2 days ago",
      unread: false,
      starred: false,
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Email</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-3 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-2">
            <Card className="divide-y divide-border">
              {emails.map((email, idx) => (
                <div
                  key={idx}
                  className={`p-4 hover:bg-secondary transition-colors cursor-pointer ${
                    email.unread ? "bg-secondary/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                      {email.from[0]}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className={`font-semibold truncate ${
                            email.unread ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {email.from}
                        </p>
                        {email.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                        <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                          {email.time}
                        </span>
                      </div>
                      <p
                        className={`font-medium mb-1 truncate ${
                          email.unread ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {email.subject}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {email.preview}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {email.priority === "high" && (
                          <Badge variant="destructive" className="text-xs">
                            High Priority
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          AI Reply
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={email.starred ? "text-yellow-500" : ""}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Email Stats */}
          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">Inbox Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Unread</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Starred
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Avg Response Time
                  </p>
                  <p className="text-2xl font-bold">2.4h</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Smart Compose
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive All Read
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  View Starred
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
