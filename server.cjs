const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'dist');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };
http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400); response.end('Bad request'); return; }
  const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!filename.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
  fs.readFile(filename, (error, content) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    response.writeHead(200, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    response.end(content);
  });
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
