import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-700 p-4 rounded text-white">
          <h3 className="font-bold text-xl">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm">Status: {task.status}</p>
          <p className="text-sm">
            Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this task?"))
                  onDelete(task.id || task._id);
              }}
              className="bg-red-600 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
