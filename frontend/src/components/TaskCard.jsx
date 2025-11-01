export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 mb-3 rounded-xl shadow-md flex justify-between items-start">
      <div>
        <p className="text-sm text-indigo-600 font-semibold">{task.category}</p>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-gray-500">{task.description}</p>
        <p className="text-xs mt-1 text-gray-400">
          Best time: {task.bestTime}
        </p>
      </div>
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {task.priority}
      </span>
    </div>
  );
}
