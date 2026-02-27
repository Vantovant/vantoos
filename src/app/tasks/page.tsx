"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTasks } from "@/hooks/useData";
import {
  LayoutGrid,
  List,
  Plus,
  Calendar,
  Flag,
  Sparkles,
  Loader2,
} from "lucide-react";

// Helper to format due date for display
function formatDueDate(dueDate: string | null | undefined): string {
  if (!dueDate) return "No date";

  const due = new Date(dueDate);
  const now = new Date();
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays <= 7) return `In ${diffDays} days`;
  return due.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TasksPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const { tasksByStatus, tasks, loading, error } = useTasks();

  // Render loading state
  if (loading) {
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
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading tasks...</span>
          </div>
        </main>
      </div>
    );
  }

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

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive">
            <p>{error}</p>
          </div>
        )}

        {view === "kanban" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["todo", "inProgress", "done"] as const).map((status) => {
              const statusTasks = tasksByStatus[status];
              const statusLabels = {
                todo: "To Do",
                inProgress: "In Progress",
                done: "Done",
              };

              return (
                <Card key={status} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">{statusLabels[status]}</h2>
                    <Badge variant="secondary">{statusTasks.length}</Badge>
                  </div>

                  <div className="space-y-3">
                    {statusTasks.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No tasks
                      </p>
                    ) : (
                      statusTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-sm flex-1">
                                {task.title}
                              </p>
                              {task.autoScheduled && (
                                <Sparkles className="h-4 w-4 text-accent flex-shrink-0" />
                              )}
                            </div>
                            {task.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {task.description}
                              </p>
                            )}
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
                                {formatDueDate(task.dueDate)}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks yet. Create your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 ${
                        task.status === "done"
                          ? "bg-primary border-primary"
                          : "border-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium ${
                          task.status === "done"
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {task.status === "inProgress"
                          ? "In Progress"
                          : task.status === "todo"
                            ? "To Do"
                            : "Done"}
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
                        {formatDueDate(task.dueDate)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </main>
    </div>
  );
}
