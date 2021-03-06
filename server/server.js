//configuracion del servidor
const express = require("express");//es como importar librerias
const app = express();
const servidor= require("http").createServer(app);
servidor.listen(process.env.PORT || 3000);//aqui se elige el puerto
const socketio = require("socket.io");
const io = socketio.listen(servidor);


app.use(express.static("global"));

users = [];//aqui se crea un array para los clientes

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("enviarMensaje", (data)=>{//aqui recibe el mensaje y quien lo envia
        console.log(data);
        
        io.emit("forAllMensaje", data);//aqui envia a todos el mensaje y quien lo envio
    });
    
    socket.on("login", (data)=>{//aqui se registra el nombre del cliente
        users.push({"name":data.name, "socketid":data.socketid});//aqui se guarda el nombre del cliente
    })

})//("nombre del evento", function (data){}})