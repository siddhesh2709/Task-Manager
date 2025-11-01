// src/pages/Dashboard.jsx
import { useState } from "react";
import { Plus, Clock, MapPin } from "lucide-react";
import TaskCard from "../components/TaskCard";
import Overview from "../components/Overview";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("today");
  const tasks = [
    {
      id: 1,
      title: "Send mail",
      description: "Mail to VP",
      category: "Work",
      status: "Pending",
      priority: "Urgent",
      bestTime: "Morning",
    },
    {
      id: 2,
      title: "Fix bug",
      description: "Resolve UI issue",
      category: "Personal",
      status: "In Progress",
      priority: "Urgent",
      bestTime: "Afternoon",
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-700">
          Context-Aware Reminder
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <Clock className="text-gray-600" /> 04:19 PM
          <MapPin className="text-gray-600" /> 13.41°, 80.13°
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-1 w-fit">
        {["Today", "All Tasks", "Smart Suggestions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab.toLowerCase()
                ? "bg-indigo-600 text-white"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Left Section - Tasks */}
        <div className="flex-1">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold">Today's Tasks</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus size={18} /> Add Task
            </button>
          </div>

          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Right Section - Overview */}
        <div className="w-1/3">
          <Overview tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
