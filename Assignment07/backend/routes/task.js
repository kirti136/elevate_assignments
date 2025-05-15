const { readTasks, writeTasks } = require('../utils/fileHandler');
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// Simple UUID generator
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Log events
emitter.on('taskChanged', (msg) => {
  console.log(`[Task Changed] ${new Date().toISOString()} - ${msg}`);
});

function getTasks(req, res) {
  const tasks = readTasks();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(tasks));
}

function createTask(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const { title } = JSON.parse(body);
      if (!title || title.trim() === '') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Title is required' }));
      }

      const tasks = readTasks();
      const newTask = { id: generateId(), title: title.trim(), completed: false };
      tasks.push(newTask);
      writeTasks(tasks);

      emitter.emit('taskChanged', `Task Created: ${newTask.title}`);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTask));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

function updateTask(req, res, id) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const { title, completed } = JSON.parse(body);
      const tasks = readTasks();
      const taskIndex = tasks.findIndex(t => t.id === id);

      if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Task not found' }));
      }

      if (title !== undefined) {
        if (title.trim() === '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Title cannot be empty' }));
        }
        tasks[taskIndex].title = title.trim();
      }

      if (completed !== undefined) {
        tasks[taskIndex].completed = !!completed;
      }

      writeTasks(tasks);
      emitter.emit('taskChanged', `Task Updated: ${id}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks[taskIndex]));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}

module.exports = { getTasks, createTask, updateTask };
