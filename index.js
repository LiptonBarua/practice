const express = require('express');
const http= require("http")
const app= express();
const cors = require("cors")
const port =5000 || process.env.PORT;
app.use(cors())

const httpServer= http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
  console.log("user is connected");

  socket.on("disconnection", (socket) => {
 console.log("user disconnected")
});

// socket.on("chatEvent", (data) => {
//     console.log(data)
//     io.emit("chatShow", data);
// });
socket.on("reactEvent", (data) => {
    console.log(data)
    socket.broadcast.emit("showMessage", data)
   
});
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
