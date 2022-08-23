const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const socketio = require('socket.io');
const io = socketio(server);


app.use('/',express.static(path.join(__dirname,'public')));

const users={};

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on('send-msg',(data)=>{
     io.emit('receive-msg',{
        msg:data.msg,
        username:users[socket.id]
     })
    })

    socket.on('login',(data)=>{
        users[socket.id]=data.username;
 
    })
  });




const port = process.env.PORT||4000;
server.listen(port, ()=>{
    console.log(`server lissen on port ${port}`);
})
