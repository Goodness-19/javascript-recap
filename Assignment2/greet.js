const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/greet") && req.method === "GET") {
    const query = url.parse(req.url, true).query;
    const name = query.name;

    res.writeHead(200, { "Content-Type": "text/plain" });

    if (name) {
      res.end(`Hello ${name}, welcome to Node.js!`);
    } else {
      res.end("Hello Guest!");
    }
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Greeting API running on port 3000");
});
