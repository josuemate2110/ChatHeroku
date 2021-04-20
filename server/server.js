//configuracion del servidor
const express = require("express");//es como importar
const app = express();
const servidor= require("http").createServer(app);
servidor.listen(process.env.PORT || 3000);//aqui se elige el puerto
const socketio = require("socket.io");
const io = socketio.listen(servidor);


app.use(express.static("global"));

users = [];

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("enviarMensaje", (data)=>{
        console.log(data);
        
        io.emit("forAllMensaje", data);
    });
    
    socket.on("login", (data)=>{
        users.push({"name":data.name, "socketid":data.socketid});
    })

})//("nombre del evento", function (data){}})