"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarPage() {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const events = [
    {
      day: 0,
      startHour: 9,
      duration: 1,
      title: "Team Standup",
      color: "bg-blue-500/20 border-blue-500",
    },
    {
      day: 0,
      startHour: 14,
      duration: 2,
      title: "Client Meeting",
      color: "bg-purple-500/20 border-purple-500",
    },
    {
      day: 1,
      startHour: 10,
      duration: 1.5,
      title: "Design Review",
      color: "bg-green-500/20 border-green-500",
    },
    {
      day: 2,
      startHour: 11,
      duration: 1,
      title: "Budget Planning",
      color: "bg-red-500/20 border-red-500",
    },
    {
      day: 2,
      startHour: 15,
      duration: 1,
      title: "Product Demo",
      color: "bg-yellow-500/20 border-yellow-500",
    },
    {
      day: 3,
      startHour: 9,
      duration: 0.5,
      title: "Quick Sync",
      color: "bg-pink-500/20 border-pink-500",
    },
    {
      day: 4,
      startHour: 13,
      duration: 2,
      title: "Workshop",
      color: "bg-indigo-500/20 border-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">February 24-28, 2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        <Card className="p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 mb-4">
              <div className="text-sm text-muted-foreground">Time</div>
              {days.map((day) => (
                <div key={day} className="text-sm font-semibold text-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="relative">
              {hours.map((hour, hourIdx) => (
                <div
                  key={hour}
                  className="grid grid-cols-6 gap-4 border-t border-border"
                  style={{ height: "80px" }}
                >
                  <div className="text-sm text-muted-foreground py-2">
                    {hour}:00
                  </div>
                  {days.map((day, dayIdx) => (
                    <div
                      key={`${day}-${hour}`}
                      className="relative border-l border-border hover:bg-secondary/50 transition-colors"
                    >
                      {events
                        .filter(
                          (event) =>
                            event.day === dayIdx && event.startHour === hour
                        )
                        .map((event, eventIdx) => (
                          <div
                            key={eventIdx}
                            className={`absolute inset-x-1 rounded-lg border-l-4 p-2 ${event.color} cursor-pointer hover:shadow-md transition-shadow`}
                            style={{
                              top: "4px",
                              height: `${event.duration * 80 - 8}px`,
                            }}
                          >
                            <p className="text-xs font-semibold">
                              {event.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {hour}:00 - {hour + event.duration}:
                              {(event.duration % 1) * 60 || "00"}
                            </p>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
