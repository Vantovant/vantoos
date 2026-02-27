"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  LayoutGrid,
  List,
  Plus,
  Calendar,
  Flag,
  Sparkles,
} from "lucide-react";

export default function TasksPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const tasks = {
    todo: [
      {
        title: "Design new landing page",
        priority: "high",
        due: "Today",
        autoScheduled: true,
      },
      {
        title: "Review customer feedback",
        priority: "medium",
        due: "Tomorrow",
        autoScheduled: false,
      },
      {
        title: "Update documentation",
        priority: "low",
        due: "Next week",
        autoScheduled: true,
      },
    ],
    inProgress: [
      {
        title: "Implement payment gateway",
        priority: "high",
        due: "Today",
        autoScheduled: true,
      },
      {
        title: "Write blog post",
        priority: "medium",
        due: "Tomorrow",
        autoScheduled: false,
      },
    ],
    done: [
      {
        title: "Team standup meeting",
        priority: "low",
        due: "Today",
        autoScheduled: false,
      },
      {
        title: "Code review",
        priority: "medium",
        due: "Yesterday",
        autoScheduled: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and organize your work
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === "kanban" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {view === "kanban" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(tasks).map(([status, taskList]) => (
              <Card key={status} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold capitalize">
                    {status === "inProgress" ? "In Progress" : status}
                  </h2>
                  <Badge variant="secondary">{taskList.length}</Badge>
                </div>
                <div className="space-y-3">
                  {taskList.map((task, idx) => (
                    <Card key={idx} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-sm flex-1">{task.title}</p>
                          {task.autoScheduled && (
                            <Sparkles className="h-4 w-4 text-accent flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="h-3 w-3 mr-1" />
                            {task.due}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6">
            <div className="space-y-2">
              {Object.entries(tasks).flatMap(([status, taskList]) =>
                taskList.map((task, idx) => (
                  <div
                    key={`${status}-${idx}`}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded border-2 border-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {status === "inProgress" ? "In Progress" : status}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {task.autoScheduled && (
                        <Sparkles className="h-4 w-4 text-accent" />
                      )}
                      <Badge
                        variant={
                          task.priority === "high" ? "destructive" : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.due}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
