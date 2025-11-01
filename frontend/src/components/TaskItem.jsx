import React from 'react';
import dayjs from 'dayjs';
import { useTasks } from '../context/TaskContext';

function urgencyClass(score){
  if (score >= 80) return 'border-l-4 border-red-500';
  if (score >= 50) return 'border-l-4 border-orange-400';
  if (score >= 20) return 'border-l-4 border-yellow-400';
  return 'border-l-4 border-green-400';
}

export default function TaskItem({ task }){
  const { updateTask, removeTask } = useTasks();
  const dueLabel = task.deadline ? formatDue(task.deadline) : 'No deadline';

  async function toggleComplete(){ await updateTask(task._id, { completed: !task.completed }); }
  async function markDone(){ await updateTask(task._id, { completed: true }); }
  async function del(){ await removeTask(task._id); }

  return (
    <div className={`p-3 mb-2 bg-white rounded shadow-sm ${urgencyClass(task.score ?? 0)}`}>
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{task.title}</div>
          <div className="text-sm text-gray-500">{dueLabel} • est {task.estimatedMinutes}m</div>
        </div>
        <div className="text-right">
          <div className="text-sm">{task.score ?? '-'}</div>
          <div className="flex gap-1 mt-2">
            <button onClick={toggleComplete} className="text-xs px-2 py-1 border rounded">Toggle</button>
            <button onClick={markDone} className="text-xs px-2 py-1 bg-green-600 text-white rounded">Done</button>
            <button onClick={del} className="text-xs px-2 py-1 border rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDue(d){
  const diff = dayjs(d).diff(dayjs(), 'hour');
  if (dayjs(d).isBefore(dayjs())) {
    return `Overdue by ${dayjs().to(dayjs(d))}`; // e.g., '2 hours ago'
  }
  return `Due ${dayjs(d).fromNow()}`;
}
