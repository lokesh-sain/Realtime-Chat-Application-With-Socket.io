const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

//Variables
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",(request,response)=>{
    response.sendFile(path.resolve(__dirname,"./index.html"));
});

http.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});

//Socket

const io = require("socket.io")(http);

io.on("connection",(socket)=>{
    socket.on('message',(message)=>{
        socket.broadcast.emit('replyMessage',message);
    });
})

