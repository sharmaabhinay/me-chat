const express = require('express');
const http = require('http');
const app = express()
// const {Server} = require('socket.io')
const socketIO = require('socket.io');
// const { userSchema } = require('./userSchema');
let PORT = '4300'
const server= http.createServer(app)
const io = socketIO(server)
// userSchema()
let users = [{}]
io.on('connection',(socket)=> {
    console.log('New connection');

    socket.on('joined',({user})=> {
        users[socket.id] = user.number;
        console.log(user);
        socket.broadcast.emit('userJoined',{user:users[socket.id], message:`${users[socket.id]} has joineddd`})
        socket.emit('welcome',{user:users[socket.id],message:'Welcome to the chat'})
        console.log(io.engine.clientsCount)
        socket.on('message-send',(data)=> {
            io.emit('new-massage',{user:data.user.name,message:data.message})
        })
    });
    socket.on('disconnect',()=> {
        socket.broadcast.emit('leave',{user:users[socket.id],message:'this user has left the chat'})
        console.log(users[socket.id],'has left the chat')
    })
    
})

app.get('/',(req,res)=> {
    res.send('hello world')
})
let Time = new Date()
server.listen(PORT,()=> {
    console.log('server is running on port',PORT,' at ', Time.getMinutes(),":",Time.getSeconds())
})