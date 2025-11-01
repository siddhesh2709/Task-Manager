import React from "react";
import { useTasks } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SuggestionsPanel from "./components/SuggestionsPanel";

export default function App() {
  const { user } = useTasks();

  if (!user) {
    return <AuthShell />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-pink-300 p-6 text-gray-900 font-poppins">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 bg-white/30 backdrop-blur-lg rounded-2xl p-4 shadow-md">
          <h1 className="text-3xl font-bold text-indigo-800">
            Context-Aware Reminder{" "}
            <span className="text-gray-700 text-base font-normal">
              Good Afternoon! 👋
            </span>
          </h1>

          <div className="flex items-center gap-4 text-sm">
            <div className="bg-white/60 px-4 py-2 rounded-lg shadow">
              🕒 {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="bg-white/60 px-4 py-2 rounded-lg shadow">
              📍 Location: 13.41°, 80.13°
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          <main className="col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                + Add Task
              </button>
            </div>

            <TaskForm />
            <TaskList />
          </main>

          <aside className="col-span-1">
            <SuggestionsPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}

function AuthShell() {
  const handleMockLogin = () => {
    localStorage.setItem("mockUser", JSON.stringify({ name: "John Doe", email: "john@example.com" }));
    window.location.reload(); // simulate login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-pink-300">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-2 text-indigo-800">
          Please login <span className="ml-1">🔒</span>
        </h2>
        <p className="text-gray-600 mb-6">
          You can use Postman or implement the login form next.
        </p>
        <button
          onClick={handleMockLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all"
        >
          Mock Login
        </button>
      </div>
    </div>
  );
}
