import React from "react";
import { useState, useEffect } from "react";

const initialState = {
  title: "",
  description: "",
  status: "Pending",
  dueDate: "",
};

const TaskForm = ({ onSubmit, selectedTask }) => {
  const [task, setTask] = useState(initialState);

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded text-white space-y-2"
    >
      <h2 className="text-lg font-semibold">
        {selectedTask ? "Edit Task" : "Create Task"}
      </h2>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-2 rounded bg-gray-700"
      />
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 rounded bg-gray-700"
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={
          task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
        }
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700"
      />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
        {selectedTask ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TaskForm;
