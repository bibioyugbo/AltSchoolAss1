const path = require("path");
const fs = require("fs");
itemListPath = path.join(__dirname,"items.json")


function readItemList(callback) {
    fs.readFile(itemListPath, "utf-8", (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        try {
            const items = JSON.parse(data);
            callback(null, items);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

function writeItemList(items, callback) {
    fs.writeFile(itemListPath, JSON.stringify(items), callback);
}


module.exports = {readItemList, writeItemList};     