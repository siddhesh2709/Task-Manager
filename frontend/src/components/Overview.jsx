export default function Overview({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const progress = tasks.filter((t) => t.status === "In Progress").length;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-bold text-lg mb-4">Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">{total}</p>
          <p className="text-gray-500 text-sm">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{completed}</p>
          <p className="text-gray-500 text-sm">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
          <p className="text-gray-500 text-sm">Pending</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{progress}</p>
          <p className="text-gray-500 text-sm">In Progress</p>
        </div>
      </div>
    </div>
  );
}
