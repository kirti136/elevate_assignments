const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

function readTasks() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
