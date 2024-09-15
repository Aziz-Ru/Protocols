import { createId } from "@paralleldrive/cuid2";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.set("view engine", "ejs");
// app.set("views", "./views");
app.use(express.static("public"));
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.redirect(`/${createId()}`);
});
app.get("/:room", (req, res) => {
  res.render("index", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    console.log(roomId, userId);
    socket.to(roomId).emit("user-connected", userId);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
