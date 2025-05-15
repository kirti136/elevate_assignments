const http = require("http");
const url = require("url");
const { getTasks, createTask, updateTask } = require("./routes/tasks");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  if (req.method === "GET" && pathname === "/tasks") {
    return getTasks(req, res);
  }

  if (req.method === "POST" && pathname === "/tasks") {
    return createTask(req, res);
  }

  if (req.method === "PUT" && pathname.startsWith("/tasks/")) {
    const id = pathname.split("/")[2];
    if (!id) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Task ID required" }));
    }
    return updateTask(req, res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
