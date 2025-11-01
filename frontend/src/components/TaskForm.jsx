import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const { createTask } = useTasks(); // make sure this line exists!
  const [title, setTitle] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTask({ title, status: "pending" });
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 p-2 border rounded"
      />
      <button className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700">
        Add
      </button>
    </form>
  );
}
