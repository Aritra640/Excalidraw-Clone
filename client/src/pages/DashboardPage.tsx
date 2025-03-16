import { useState } from "react";
import { FileLines } from "@/components/heroicons/file_lines";
import { Button } from "@/components/ui/button";
import { Folder, Users, Plus, LogOut, X } from "lucide-react";

export function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-950 h-screen w-screen flex">
      {/* Sidebar - Mobile & Desktop */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-slate-950 md:bg-indigo-950/25 shadow-lg p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center">
          {/* Fancy Username */}
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text drop-shadow-lg">
            <div className="md:pl-4">Aritra Chatterjee</div>
          </div>
          {/* Close Button for Mobile */}
          <button
            className="text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="pt-8"></div>

        <nav className="flex flex-col gap-4 text-white text-lg mt-6">
          <Button className="w-full bg-gray-900 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition">
            <Folder className="w-5 h-5" /> Projects
          </Button>
          <Button className="w-full bg-gray-900 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition">
            <Plus className="w-5 h-5" /> New Project
          </Button>
          <Button className="w-full bg-gray-900 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition">
            <Users className="w-5 h-5" /> Collaborate
          </Button>
          <Button className="w-full bg-red-600 rounded-xl flex items-center gap-3 hover:bg-red-700 mt-auto transition">
            <LogOut className="w-5 h-5" /> Log Out
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          {/* Hamburger Menu for Small Screens */}
          <button
            className="md:hidden p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setIsSidebarOpen(true)}
          >
           <div className="text-white cursor-pointer"><FileLines/></div>
          </button>

          <div className="text-3xl text-white font-sans ml-auto">Excalidraw-Clone</div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-10 flex flex-col items-center text-white">
          <h2 className="text-4xl font-bold mb-6">Welcome to Your Dashboard</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start a new project or collaborate with your team!
          </p>
          <div className="flex gap-6">
            <Button className="px-6 py-3 text-lg bg-gray-900 hover:bg-gray-800 transition">
              New Project
            </Button>
            <Button className="px-6 py-3 text-lg bg-gray-900 hover:bg-gray-800 transition">
              Collaborate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

