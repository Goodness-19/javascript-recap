const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/login" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      
      console.log("Request Body:", data);

      res.writeHead(200, { "Content-Type": "text/plain" });

      if (data.username === "admin" && data.password === "1234") {
        res.end("Login successful");
      } else {
        res.end("Invalid credentials");
      }
    });
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3001, () => {
  console.log("Login API running on port 3001");
});
