const http = require ('http');
var fs = require('fs');
const hostname = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req,res)=>{
    if (req.url==='/') {
        res.statusCode = 200;
        res.writeHead(200, { 'Content-Type':'text/html'});
        html = fs.readFileSync('./index.html');
        res.end(html);
    }
    if (req.url==='/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain; charset=utf-8');
        res.end('Você está na página sobre')
    }
    if(req.method === 'POST' && req.url === '/upload') {
        let fileData = '';
        req.on('data',chunk => {
            fileData += chunk.toString()
        });
        req.on('end', ()=> {
            res.statusCode = 200;
            res.setHeader ('Content-Type','text/plain; charset=utf-8');
            res.end('Upload simulado com sucesso!');
        });
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain; charset=utf-8');
        res.end('Rota nâo encontrada');
    }
});

server.listen(port, hostname, ()=> {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});