const http = require ('http');
const fs = require('fs');
const path = require('path');

const HOSTNAME ='localhost';
const PORT = 8000;
const simpleWebPagePath = path.join(__dirname,'index.html');


function requestHandler(req,res){
    console.log(req.url)
    if(req.url === "/index.html" || req.url ==="/"){
        displayWebPage(req,res)
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<head><title>Error Page</title></head><h1>404 Not Found</h1>');
    }

}
const server = http.createServer(requestHandler)

function displayWebPage(req,res){
    console.log("Reading index.html...");
    fs.readFile(simpleWebPagePath, 'utf-8', (err, data) => {
        if(err){
            console.log(err);
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end("Error fetching WebPage")
        }
        else{
            res.end(data)
        }
    })
}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server started successfully at http://${HOSTNAME}:${PORT}`);
})