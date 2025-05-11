import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      console.log("Tasks loaded:", res.data);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (task) => {
    try {
      if (task.id || task._id) {
        await updateTask(task.id || task._id, task);
        setSelectedTask(null);
      } else {
        await createTask(task);
      }
      loadTasks();
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <TaskForm onSubmit={handleSubmit} selectedTask={selectedTask} />
      <TaskList
        tasks={tasks}
        onEdit={setSelectedTask}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Task;
