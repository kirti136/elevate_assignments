import React, { useState } from "react";

const categories = ["All", "Work", "Personal", "Learning"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Work");
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (newTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTitle,
          category: newCategory,
          completed: false,
        },
      ]);
      setNewTitle("");
      setNewCategory("Work");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Task Management Board</h1>

        {/* Add Task */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 border border-gray-600"
          >
            {categories.slice(1).map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <label className="mr-2">Filter by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <ul className="space-y-2 mb-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 rounded bg-gray-700 ${
                task.completed ? "opacity-50 line-through" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompleted(task.id)}
                />
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-xs text-gray-400">{task.category}</div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
          {filteredTasks.length === 0 && (
            <li className="text-center text-gray-400">No tasks to display</li>
          )}
        </ul>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <button
            onClick={handleClearCompleted}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Clear All Completed
          </button>
          <span className="text-sm text-gray-300">
            {remainingCount} task{remainingCount !== 1 ? "s" : ""} remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
