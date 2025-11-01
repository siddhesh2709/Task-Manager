import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // ✅ Load mock user if available
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Create new task
  const createTask = async (taskData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", taskData);
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // ✅ Update a task
  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ user, setUser, tasks, setTasks, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
