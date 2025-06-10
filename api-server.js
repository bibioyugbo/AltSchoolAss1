const http = require("http");
const Item = require("./item/item-actions");
const HOSTNAME = 'localhost';
const PORT = 8000;
const server = http.createServer(requestHandler)

function requestHandler(req, res) {
    if(req.method === "POST" && req.url === "/item"){
        Item.addItem(req,res)
    }
    else if(req.method === "GET" && req.url === "/item"){
        Item.getItems(req,res)
    }
    else if(req.method === "PUT" && req.url === "/item"){
        Item.updateItem(req,res)
    }
    else if(req.method === "DELETE" && req.url === "/item"){
        Item.deleteItem(req,res)
    }
    else if(req.method === "GET" && req.url.includes("/item/")){
        Item.getSingleItem(req,res)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Route Not Found")
    };
}

server.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server started successfully at http://${HOSTNAME}:${PORT}`);
})


