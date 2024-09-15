const { readFile } = require("fs");
const http = require("http");
const path = require("path");
const { server } = require("websocket");

const connections = [];
// create a raw http server
const httpServer = http.createServer();

// pass the httpserver object to the Websocket Library
// to all the job
const wsServer = new server({ httpServer: httpServer });

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});

httpServer.on("request", (req, res) => {
  const filePath = path.join(__dirname, "view/ws.html");
  readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end();
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(content);
  });
});

// The wsServer (a WebSocket server) listens for incoming connection requests.
// When a connection is established, the on("request") event is triggered.
wsServer.on("request", (req) => {
  /**
   * The server accepts the incoming WebSocket request and establishes a connection with the client.
   *  The second parameter, req.origin,ensures that the
   * client comes from an allowed origin.
   */
  const connection = req.accept(null, req.origin);

  //After the connection is established, the server listens for any messages (msg) sent by the client.
  connection.on("message", (msg) => {
    connections.forEach((c) => {
      //someones sends a message to the server, the server sends it to all the clients
      c.send(`User ${connection.socket.remoteAddress} says ${msg.utf8Data}`);
    });
  });
  connections.push(connection);
  connections.forEach((c) => {
    c.send(`User ${connection.socket.remoteAddress} connected`);
  });
});
