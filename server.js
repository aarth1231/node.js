import http from 'http';

const port = process.env.PORT || 8000;

// Simple in-memory data array (mimicking your controller file)
let posts = [
  { id: 1, title: 'post one' },
  { id: 2, title: 'post two' }
];

const server = http.createServer((req, res) => {
  // Always safely ignore favicon
  if (req.url === '/favicon.ico') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Set default header to JSON for API communication
  res.setHeader('Content-Type', 'application/json');

  // ---- 1. READ ALL (GET /api/posts) ----
    if (req.method === 'GET' && req.url === '/api/posts') {
    res.statusCode = 200;
    res.end(JSON.stringify(posts));
  } else if (req.method === 'POST' && req.url === '/api/posts') { 
    // Data chunks collection continues below...


    // Collect data chunks from Thunder Client
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Once all data arrives, parse it, add it, and respond
    req.on('end', () => {
      const { title } = JSON.parse(body);
      
      const newPost = { id: posts.length + 1, title };
      posts.push(newPost);

      res.statusCode = 201; // 201 means "Created Successfully"
      res.end(JSON.stringify(newPost));
    });
  } 
  
  // ---- 3. FALLBACK FOR MISSING ROUTES ----
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Endpoint Not Found' }));
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
