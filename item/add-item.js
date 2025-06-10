const fs = require("fs");
const path = require("path");

itemListPath = path.join(__dirname,"items.json")

function addItem(req,res){
    const body =[]
    req.on("data",(chunk)=>{
       body.push(chunk)

    })
    req.on("end", ()=>{
        const parsedItem = Buffer.concat(body).toString()
        const newItem = JSON.parse(parsedItem);
        // console.log(parsedItem)

        //add new item to item list
        fs.readFile(itemListPath, "utf-8", (err,data)=>{
            if (err){
                console.error("Error reading item list:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Internal Server Error");
            }
        
                const oldItems = JSON.parse(data);
                const newItems = [...oldItems, newItem];
              
                fs.writeFile(itemListPath, JSON.stringify(newItems), (err) => {
                    if (err) {
                        console.error("Error writin to item list:", err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end("Internal Server Error");
            
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                         message: "Item added successfully",
                         item: newItem
                         }));
                });
           
        })
       
    })
}

module.exports = {
    addItem
};