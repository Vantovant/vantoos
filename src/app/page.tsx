"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">Good morning, Vanto</h1>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground">
            Here's what's happening with your day
          </p>
        </div>

        {/* AI Daily Agenda */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">AI-Generated Daily Agenda</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">9:00 AM - Team Standup</p>
                <p className="text-sm text-muted-foreground">
                  Prepare quarterly review slides
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">11:00 AM - Client Presentation</p>
                <p className="text-sm text-muted-foreground">
                  Present Q1 marketing strategy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">2:00 PM - Focus Time</p>
                <p className="text-sm text-muted-foreground">
                  Complete project documentation
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Top 5 Priorities */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Top 5 Priorities</h2>
          <div className="space-y-3">
            {[
              {
                title: "Complete Q1 Financial Report",
                due: "Due today",
                status: "urgent",
              },
              {
                title: "Review marketing campaign analytics",
                due: "Due tomorrow",
                status: "high",
              },
              {
                title: "Update product roadmap",
                due: "Due in 2 days",
                status: "medium",
              },
              {
                title: "Client follow-up emails",
                due: "Due in 3 days",
                status: "medium",
              },
              {
                title: "Team performance reviews",
                due: "Due next week",
                status: "low",
              },
            ].map((task, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.due}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    task.status === "urgent" ? "destructive" : "secondary"
                  }
                >
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Calendar Preview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">This Week</h2>
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
            <div className="space-y-3">
              {[
                {
                  day: "Mon",
                  events: [
                    { time: "9:00 AM", title: "Team Standup", color: "blue" },
                    {
                      time: "2:00 PM",
                      title: "Client Meeting",
                      color: "purple",
                    },
                  ],
                },
                {
                  day: "Tue",
                  events: [
                    { time: "10:00 AM", title: "Design Review", color: "green" },
                  ],
                },
                {
                  day: "Wed",
                  events: [
                    { time: "11:00 AM", title: "Budget Planning", color: "red" },
                    {
                      time: "3:00 PM",
                      title: "Product Demo",
                      color: "yellow",
                    },
                  ],
                },
              ].map((day, idx) => (
                <div key={idx} className="border-l-2 border-primary/20 pl-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    {day.day}
                  </p>
                  {day.events.map((event, eidx) => (
                    <div
                      key={eidx}
                      className="mb-2 p-2 rounded-lg bg-secondary/50"
                    >
                      <p className="text-xs text-muted-foreground">
                        {event.time}
                      </p>
                      <p className="text-sm font-medium">{event.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* Email Summaries */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Important Emails</h2>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {[
                {
                  from: "Sarah Johnson",
                  subject: "Q1 Budget Approval Needed",
                  preview: "Please review and approve the Q1 budget...",
                  unread: true,
                },
                {
                  from: "Marketing Team",
                  subject: "Campaign Performance Update",
                  preview: "Our latest campaign exceeded expectations...",
                  unread: true,
                },
                {
                  from: "John Smith",
                  subject: "Project Timeline Adjustment",
                  preview: "I wanted to discuss adjusting our timeline...",
                  unread: false,
                },
              ].map((email, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                >
                  <Avatar className="h-10 w-10 bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {email.from[0]}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">
                        {email.from}
                      </p>
                      {email.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="font-medium text-sm truncate">
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {email.preview}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Financial Snapshot */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Financial Snapshot</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Monthly Income
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">R12,450</p>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expenses</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">R8,230</p>
                  <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -5%
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Balance</p>
                <p className="text-2xl font-bold text-primary">R24,890</p>
              </div>
            </div>
          </Card>

          {/* Personal Reminders */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Reminders</h2>
            <div className="space-y-3">
              {[
                { text: "Pick up dry cleaning", done: false },
                { text: "Dentist appointment - 3 PM", done: false },
                { text: "Buy birthday gift for mom", done: false },
                { text: "Review insurance policy", done: true },
              ].map((reminder, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {reminder.done ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <p
                    className={
                      reminder.done
                        ? "text-sm text-muted-foreground line-through"
                        : "text-sm"
                    }
                  >
                    {reminder.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Business Alerts */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Business Alerts</h2>
            <div className="space-y-3">
              {[
                {
                  type: "warning",
                  text: "Invoice #1234 overdue by 5 days",
                },
                {
                  type: "info",
                  text: "New client inquiry received",
                },
                {
                  type: "success",
                  text: "Project milestone completed",
                },
              ].map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <AlertCircle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.type === "warning"
                        ? "text-yellow-500"
                        : alert.type === "success"
                          ? "text-green-500"
                          : "text-primary"
                    }`}
                  />
                  <p className="text-sm flex-1">{alert.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
