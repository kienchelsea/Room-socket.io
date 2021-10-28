var socket = io("http://localhost:1000");

socket.on("Server-send-listRoom", function(data){
    data.map(function(r){
        $("#listRoom").html("")
        $("#listRoom").append("<h4 class = 'room'> " + r +" </h4>")
    })
})
socket.on("Server-send-roomSocket", function(data){
    $("#roomNow").html(data);
})
socket.on("Server-chat", function(data){
    $("#right").append("<div> "+ data + " </div>");
})
$(document).ready(function() {
    $("#btnCreateRoom").click(function(){
        socket.emit("Tao Room", $("#txtRoom").val())
    });
    $("#btnChat").click(function(){
        socket.emit("User-Chat", $("#contentMessage").val())
    })
});
