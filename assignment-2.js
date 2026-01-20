const http = require("http");
const url = require("url");
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    fs.writeFileSync("data.txt", "Hello Node");
    data = "Hello Node";
  }

  console.log("Original content:", data);

  fs.appendFile("data.txt", "\nThis line was added today", err => {
    if (err) throw err;

    fs.readFile("data.txt", "utf8", (err, newData) => {
      if (err) throw err;
      console.log("New content:", newData);
    });
  });
});

let users = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/greet" && req.method === "GET") {
    const name = parsedUrl.query.name;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello ${name || "Guest"}, welcome to Node.js!`);
  }

  else if (parsedUrl.pathname === "/login" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      console.log(data);

      res.writeHead(200, { "Content-Type": "text/plain" });

      if (data.username == "admin" && data.password == 1234) {
        res.end("Login successful");
      } else {
        res.end("Invalid credentials");
      }
    });
  }

  else if (parsedUrl.pathname === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }

  else if (parsedUrl.pathname === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);
      users.push(newUser);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
