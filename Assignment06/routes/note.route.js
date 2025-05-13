const { readNotes, writeNotes } = require("../utils/helper.js");
const { v4: uuidv4 } = require("uuid");

function handleNotesRoutes(req, res, user) {
  const method = req.method;
  const urlParts = req.url.split("/");
  const id = urlParts[2];

  let notes = readNotes();

  if (method === "GET") {
    const userNotes =
      user.role === "admin"
        ? notes
        : notes.filter((note) => note.ownerId === user.id);
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(userNotes));
  }

  if (method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const { title, content } = JSON.parse(body);
      const newNote = {
        id: uuidv4(),
        title,
        content,
        ownerId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      notes.push(newNote);
      writeNotes(notes);
      res.writeHead(201);
      res.end(JSON.stringify(newNote));
    });
    return;
  }

  if (method === "DELETE" && id) {
    const note = notes.find((n) => n.id === id);
    if (!note) {
      res.writeHead(404);
      return res.end("Note not found");
    }
    if (note.ownerId !== user.id && user.role !== "admin") {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    notes = notes.filter((n) => n.id !== id);
    writeNotes(notes);
    res.writeHead(204);
    return res.end();
  }

  if (method === "PUT" && id) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const index = notes.findIndex((n) => n.id === id);
      if (index === -1) {
        res.writeHead(404);
        return res.end("Note not found");
      }
      const note = notes[index];
      if (note.ownerId !== user.id && user.role !== "admin") {
        res.writeHead(403);
        return res.end("Forbidden");
      }

      const { title, content } = JSON.parse(body);
      notes[index] = {
        ...note,
        title: title || note.title,
        content: content || note.content,
        updatedAt: new Date(),
      };
      writeNotes(notes);
      res.writeHead(200);
      res.end(JSON.stringify(notes[index]));
    });
    return;
  }

  res.writeHead(405);
  res.end("Method Not Allowed");
}

module.exports = handleNotesRoutes;
