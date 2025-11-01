import React from 'react';
import { useTasks } from '../context/TaskContext';

export default function SuggestionsPanel(){
  const { suggestions, fetchSuggestions } = useTasks();
  const top = (suggestions || []).slice(0,3);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Suggestions</h3>
        <button onClick={fetchSuggestions} className="text-sm text-sky-600">Refresh</button>
      </div>

      {top.map(t => (
        <div key={t._id} className="mb-3 p-2 border rounded">
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-gray-500">{t.estimatedMinutes}m • {t.contextTags?.join(', ')}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold">{t.score}</div>
              <div className="text-xs mt-1">{t.deadline ? new Date(t.deadline).toLocaleString() : 'No deadline'}</div>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button className="px-3 py-1 bg-sky-600 text-white rounded">Start Now</button>
            <button className="px-3 py-1 border rounded">Snooze 1h</button>
            <button className="px-3 py-1 border rounded">Mark Done</button>
          </div>
        </div>
      ))}

      {top.length === 0 && <div className="text-sm text-gray-500">No suggestions</div>}
    </div>
  );
}
