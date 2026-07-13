import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
const PORT = 8000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  // 1. FIX: Ignore favicon so it doesn't trigger your catch block error
  if (req.url === '/favicon.ico') {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    if (req.method === 'GET') {
      let filePath;
      if (req.url === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
      } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'public', 'about.html');
      } else {
        // 2. FIX: Instead of throwing a generic 500 error, send a proper 404 status
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
        return;
      }

      const data = await fs.readFile(filePath);
      res.setHeader('Content-Type', 'text/html');
      res.write(data);
      res.end();
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  } catch (error) {
    // This catch block now ONLY handles actual system crashes (like a missing file)
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
