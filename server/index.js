const express = require('express');
const http = require('http');
const app = express()
// const {Server} = require('socket.io')
const socketIO = require('socket.io');
// const { userSchema } = require('./userSchema');
let PORT = '4300'
app.use(express.json())
const server= http.createServer(app)
const io = socketIO(server)
const Users = require('./schemas/userSchema');
const Messages = require('./schemas/messagesSchema');
// userSchema()
let users = [{}]
app.get('/',(req,res)=> {
    res.send('hello world')
})
app.get('/html',(req,res)=> {
    res.send('html loaded')
})
// console.log(User)

io.on('connection',(socket)=> {
    socket.emit('connected',{data:'connected'});
 
    socket.on('joined',({user})=> {
        users[socket.id] = user.name;
        console.log(user);
        socket.broadcast.emit('userJoined',{user:users[socket.id], message:`${users[socket.id]} has joined`})
        socket.emit('welcome',{user:users[socket.id],message:'Welcome to the chat'})
        console.log(io.engine.clientsCount)
        socket.on('message-send',(data)=> {
            console.log(data)
            io.emit('new-massage',{user:data.user.name,message:data.message})
        })
    });
    socket.on('disconnect',()=> {
        socket.broadcast.emit('leave',{user:users[socket.id],message:'this user has left the chat'})
        console.log(users[socket.id],'has left the chat')
    })
    
})

app.post('/singin-user',async  (req,res)=> {
    const {email,phone} = req.body;
    let user = await Users.findOne({phone:phone})
    if(user){
        res.send('user found')
    }else{
        let newUser = new Users({phone:phone});
        await newUser.save();
        console.log(newUser)
        res.send('user created')
    }
    console.log(user)

    
})
app.post('/user-profile', async (req,res)=> {
    const {name,phone,profile_pic,email,about} = req.body;
    console.log(req.body)
    let user = await Users.findOne({phone:phone});
    if(user){
        let updateUser = await Users.updateOne({phone:phone},{name:name,phone:phone,profile_pic:profile_pic,about:about})
        if(updateUser){
            console.log(updateUser)
            res.send('profile updated')
        }else{
            res.send('something is broken')
        }
    }else{
        res.send('not found')
    }

});
app.post('/add-friend',async (req,res)=> {
    const {phone,frndPhone} = req.body;
    console.log(req.body)
    let user =await Users.findOne({phone:phone});
    if(user){
        let friend =await Users.findOne({phone:frndPhone})
        if(!friend){

            res.send('user not found')
        }else{
            let result = await Users.findByIdAndUpdate(
                user._id, 
                { $addToSet: { contacts: friend._id } }, 
                { new: true } 
              );
              console.log(result)
              res.status(200).send('Friend added successfully');
        }
    }else{
        res.send('logged user not found')
    }
})

app.post('/send-message',async (req,res)=> {
    const {senderId,receiverId,content} = req.body;
    console.log(req.body)
    try{
        let sender = await Users.findOne({_id:senderId});
        let receiver = await Users.findOne({_id:receiverId});
        if(!sender || !receiver){
            res.send('user not found')
        }else{
            let result = await Messages(req.body)
            await result.save();
            if(result){
                res.send('message sent and saved to the DB')
            }
        }
    }catch(err){
        console.log(err)
    }
});

app.post('/get-messages',async (req,res)=> {
    const {senderId,receiverId} = req.body;
    try{
        let result = await Messages.find({
            $or:[
                {senderId:senderId,receiverId:receiverId},
                {receiverId:senderId,senderId:receiverId}
            ]
        }).populate('senderId')
        .populate('receiverId');

        if(result){
            console.log(result)
            res.send(result)
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }

})



let Time = new Date()
server.listen(PORT,()=> {
    console.log('server is running on port',PORT,' at ', Time.getMinutes(),":",Time.getSeconds())
})