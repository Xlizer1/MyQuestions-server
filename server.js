const http = require("http");
const app = require("./app");
const port = process.env.PORT;
const ip = process.env.IP;

const server = http.createServer(app);

server.listen(port);
console.log("**************", ip + ":" + port, "**************");
