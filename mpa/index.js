const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = '';
    let contentType = 'text/html';

    if (req.url === '/') {
        filePath = path.join(__dirname, 'landing.html');
    } else if (req.url === '/bussiness') {
        filePath = path.join(__dirname, 'bussiness.html');
    } else if (req.url === '/pitch') {
        filePath = path.join(__dirname, 'pitch.html');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Page not found');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});