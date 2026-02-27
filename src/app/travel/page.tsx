"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Calendar, MapPin, Plus } from "lucide-react";

export default function TravelPage() {
  const upcomingTrips = [
    {
      destination: "San Francisco, CA",
      dates: "Mar 15-20, 2026",
      type: "Business",
      status: "confirmed",
      flights: "UA 1234 • 9:00 AM",
      hotel: "Marriott Marquis",
    },
    {
      destination: "Tokyo, Japan",
      dates: "Apr 5-12, 2026",
      type: "Vacation",
      status: "pending",
      flights: "ANA 7890 • 2:30 PM",
      hotel: "Park Hyatt Tokyo",
    },
  ];

  const pastTrips = [
    {
      destination: "New York, NY",
      dates: "Feb 10-14, 2026",
      type: "Business",
    },
    {
      destination: "London, UK",
      dates: "Jan 20-25, 2026",
      type: "Business",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Travel</h1>
            <p className="text-muted-foreground">
              Manage your trips and itineraries
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Trip
          </Button>
        </div>

        {/* Upcoming Trips */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {trip.destination}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {trip.dates}
                    </p>
                  </div>
                  <Badge
                    variant={
                      trip.status === "confirmed" ? "default" : "secondary"
                    }
                  >
                    {trip.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Plane className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Flight</p>
                      <p className="text-xs text-muted-foreground">
                        {trip.flights}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Hotel className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Accommodation</p>
                      <p className="text-xs text-muted-foreground">
                        {trip.hotel}
                      </p>
                    </div>
                  </div>
                </div>

                <Badge variant="outline">{trip.type}</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Trips */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Trips</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {pastTrips.map((trip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{trip.destination}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.dates}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{trip.type}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
