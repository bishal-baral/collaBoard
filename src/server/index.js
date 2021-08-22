const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
// const cors = require("cors");
const io = require("socket.io")(http, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname + "/../../build")));

app.get("*", function (req, res) {
  const index = path.join(__dirname, "build", "index.html");
  res.sendFile(index);
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("canvasData", (data) => {
    socket.broadcast.emit("canvasData", data);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const server_port = process.env.PORT || 5000;
http.listen(server_port, () => {
  console.log("Started on : " + server_port);
});
