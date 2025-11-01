import React, { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, fetchTasks, deleteTask, updateTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks?.length) {
    return <p className="text-gray-500">No tasks yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-500">{task.description}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => updateTask(task._id, { completed: !task.completed })}
              className="text-blue-600 hover:underline"
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
