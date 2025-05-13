const http = require("http");
const authenticate = require("./middleware/authenticate.js");
const handleNotesRoutes = require("./routes/note.route.js");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/notes")) {
    const [user, err] = authenticate(req, res);
    if (err) {
      res.writeHead(401);
      return res.end(err);
    }
    return handleNotesRoutes(req, res, user);
  }

  res.writeHead(404);
  res.end("Not Found");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
