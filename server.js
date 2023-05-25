const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3001;
const ip = process.env.IP || "192.168.100.15";

const server = http.createServer(app);

server.listen(port);
console.log("**************", ip + ":" + port, "**************");
