import socketClient from 'socket.io-client';

const SERVER = 'http://localhost:5000';
let socket;
export const connectwithWebSocket = ()=>{
   socket = socketClient(SERVER,{ transports : ['websocket'] });

   socket.on('connection',()=>{
       console.log("successfully connected with wws");
       console.log(socket.id);
   });
  
}
