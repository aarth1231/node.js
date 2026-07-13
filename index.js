import http from "http";

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello from the always-on server!");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
