const fs = require("fs");


fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("Original content:", data);

  
  fs.appendFile("data.txt", "\nThis line was added today", err => {
    if (err) throw err;

    
    fs.readFile("data.txt", "utf8", (err, newData) => {
      if (err) throw err;
      console.log("New content:", newData);
    });
  });
});
