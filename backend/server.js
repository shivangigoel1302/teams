const express = require('express');
const socket = require('socket.io');

const PORT = 5000;

const app = express();

const server = app.listen(PORT,()=>{
    console.log("server is listening on 5000");
});

const io = socket(server,{
   cosrs:{
       origin:'*',
       methods:['GET','POST']
   }
});

io.on('connection',(socket)=>{
    socket.emit('connection',null);
    console.log("new user connected");
});
