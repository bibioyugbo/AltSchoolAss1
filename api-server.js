const http = require("http");
const addItem = require("./item/add-item");
const HOSTNAME = 'localhost';
const PORT = 8000;
const server = http.createServer(requestHandler)

function requestHandler(req, res) {

    if(req.method === "POST" && req.url === "/item"){
        addItem.addItem(req,res)
    }
    res.end()
}

server.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server started successfully at http://${HOSTNAME}:${PORT}`);
})


