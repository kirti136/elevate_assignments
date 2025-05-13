const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, '../data/notes.json');

function readNotes() {
  if (!fs.existsSync(notesPath)) return [];
  return JSON.parse(fs.readFileSync(notesPath, 'utf-8'));
}

function writeNotes(notes) {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

module.exports = { readNotes, writeNotes };
