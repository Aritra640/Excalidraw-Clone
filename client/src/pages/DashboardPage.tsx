import { useState } from "react";
import { Menu, X, FilePlus, Layers, Users, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import tutorialImage from "@/assets/tutorial.jpg"; // Replace with actual image

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar (Hidden on Large Screens) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-slate-950 p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Excalidraw Clone</h2>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Sidebar Items */}
        <nav className="space-y-4">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 flex items-center gap-3">
            <FilePlus className="w-5 h-5" /> New Project
          </Button>
          <Button className="w-full bg-slate-900 hover:bg-slate-800 flex items-center gap-3">
            <Layers className="w-5 h-5" /> All Projects
          </Button>
          <Button className="w-full bg-slate-900 hover:bg-slate-800 flex items-center gap-3">
            <Users className="w-5 h-5" /> Collaborate
          </Button>
          <Button className="w-full bg-slate-900 hover:bg-slate-800 flex items-center gap-3">
            <Printer className="w-5 h-5" /> Print PDF
          </Button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          className="md:hidden mb-4"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </Button>

        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold mb-6">Welcome to Excalidraw Clone</h1>

        {/* Tutorial Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                Learn how to use Excalidraw Clone with our easy-to-follow
                tutorial.
              </p>
              <ul className="list-disc pl-5 mt-3">
                <li>Create and manage your projects</li>
                <li>Collaborate in real-time with your team</li>
                <li>Export your drawings as PDF</li>
              </ul>
            </CardContent>
          </Card>

          <div className="hidden md:block">
            <img
              src={tutorialImage}
              alt="Tutorial"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

