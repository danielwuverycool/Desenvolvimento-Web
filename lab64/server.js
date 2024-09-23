const http = require ('http');
var fs = require('fs');
const hostname = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req,res)=>{
    if (req.url==='/') {
        res.statusCode = 200;
        res.writeHead(200, { 'Content-Type':'text/html'});
        var html = fs.readFileSync('./public/index.html');
        res.end(html);
    }
    else if (req.url==='/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end('<h1>Você está na página sobre</h1><p>Aqui você encontrará Informações sobre nós</p>')
    }
    else if (req.method === 'POST' && req.url === '/upload') {
        let fileData = '';
        req.on('data',chunk => {
            fileData += chunk.toString()
        });
        req.on('end', ()=> {
            res.statusCode = 200;
            res.setHeader ('Content-Type','text/html; charset=utf-8');
            res.end('Upload simulado com sucesso!');
        });
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end('<h1>ERRO 404:</h1><p>Página não encontrada</p>');
    }
});

server.listen(PORT, hostname, ()=> {
    console.log(`Servidor rodando em http://${hostname}:${PORT}/`);
});