var express = require("express")
var app = express();
app.use(express.static("public"));

app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(1000);

io.on("connection", function(socket){   
    console.log("Co nguoi ket noi " + socket.id);
    // console.log(socket.adapter.rooms);

    socket.on("Tao Room", function(data){
        socket.join(data);
        socket.Phong = data;
        // console.log(socket.adapter.rooms);
        var array = [];
        for(r of socket.adapter.rooms){
            array.push(r[0])
        }
        io.sockets.emit("Server-send-listRoom", array);
        socket.emit("Server-send-roomSocket", data) //data lay tu dong
    })
    socket.on("User-Chat", function(data){
        io.sockets.in(socket.Phong).emit("Server-chat", data);
    })
 
   
})

app.get("/", function (req, res) {
    res.render("trangchu");
})