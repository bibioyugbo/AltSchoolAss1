const {readItemList, writeItemList} = require("./file-utilities");  


function addItem(req,res){
    const body =[]
    req.on("data",(chunk)=>{
       body.push(chunk)

    })
    req.on("end", ()=>{
        const parsedItem = Buffer.concat(body).toString()
        let newItem = JSON.parse(parsedItem);

        //add new item to item list
        readItemList(((err,oldItems)=>{
            if (err) {
                console.error("Error reading item list:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Internal Server Error");
                return;
            }
            const lastItemId = oldItems.length
            console.log("Last Item ID:", lastItemId);
            newItem.id = lastItemId + 1; // Assign a new ID based on the length of the existing items

            
            const newItems = [...oldItems, newItem];
            writeItemList(newItems, (err) => {
                if (err) {
                    console.error("Error writing to item list:", err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Internal Server Error, Could not add item to the list.");
                    return;
                }
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                     message: "Item added successfully",
                     item: newItem
                     }));
            })

        }))
    })
}
function getItems(req,res){
    readItemList((err, itemList) => {
        if (err) {
            console.error("Error reading item list:", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(itemList));
    });
}
function deleteItem(req, res){
    const body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end",()=>{
        // Parse the received data
        const parsedItem = Buffer.concat(body).toString();
        //Parse the JSON string to an object
        const itemToUpdate = JSON.parse(parsedItem);
        const itemId = itemToUpdate.id;

         //read items file
        readItemList((err, itemList) => {
        if (err) {
            console.error("Error reading item list:", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            return;
        }

        const itemIndex = itemList.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Item not found");
            return;
        }

        itemList.splice(itemIndex, 1)

        //Write to list
        writeItemList(itemList, (err) => {
            if (err) {
                console.error("Error writing to item list:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Internal Server Error, Could not add item to the list.");
                return;
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                 message: "Item deleted successfully",
                 item: itemList
                 }));
        })


    });
 })
   
}
function updateItem(req,res){
    const body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end",()=>{
        // Parse the received data
        const parsedItem = Buffer.concat(body).toString();
        //Parse the JSON string to an object
        const itemToUpdate = JSON.parse(parsedItem);
        const itemId = itemToUpdate.id;

         //read items file
        readItemList((err, itemList) => {
        if (err) {
            console.error("Error reading item list:", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            return;
        }

        const itemIndex = itemList.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Item not found");
            return;
        }
        const updatedItem ={...itemList[itemIndex],...itemToUpdate}
        itemList[itemIndex] = updatedItem;

        //Write to list
        writeItemList(itemList, (err) => {
            if (err) {
                console.error("Error writing to item list:", err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Internal Server Error, Could not add item to the list.");
                return;
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                 message: "Item updated successfully",
                 item: itemList
                 }));
        })
    });
    })
    
}
function getSingleItem(req, res) {
    const urlParts = req.url.split('/');
    const itemId = urlParts[2]
    readItemList((err, itemList) => {
        if (err) {
            console.error("Error reading item list:", err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            return;
        }
        const itemWanted = itemList.find(item=>item.id === itemId);
        if (!itemWanted) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Item not found");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Item fetched successfully",
            item: itemWanted
            }));
    })

  
}

module.exports = {
    addItem,
    getItems,
    updateItem,
    deleteItem,
    getSingleItem
};