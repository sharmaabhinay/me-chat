const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
// const {Server} = require('socket.io')
const socketIO = require("socket.io");
// const { userSchema } = require('./userSchema');
let PORT = "4300";
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server);
const Users = require("./schemas/userSchema");
const Messages = require("./schemas/messagesSchema");
// userSchema()
let users = [{}];
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/html", (req, res) => {
  res.send("html loaded");
});
app.set('io', io)
// console.log(User)
const onlineUsers = new Map();
io.on("connection", (socket) => {
  // console.log('her is the youtube : ',socket)
  console.log("socket connected : ",socket.id)

  socket.emit("connected", { data: "client connected" });
  socket.on('joined',async (user)=> {
    await Users.findOneAndUpdate({_id:user},{isOnline:true})
    console.log(`${user} is online`)
    onlineUsers.set(user,socket.id)
    console.log("on users : ",onlineUsers)
    socket.userId = user;

    let usercontacts = await Users.findOne({_id:user})
    let contacts = usercontacts.contacts;
    contacts.forEach((contact)=> {
      let contactId = contact._id.toString();
      if(onlineUsers.has(contactId)){
        const contactSocketId = onlineUsers.get(contactId);
        console.log("cs id : ",contactSocketId)
        io.to(contactSocketId).emit('frndOnline',{
          frndId:user,
          message:`${usercontacts.name} is online`
        });
        

        
      }
    })
  })
  socket.on('client-message',async (data)=>{
    console.log(data)
    let senderId = data.senderId;
    let receiverId = data.receiverId;
    
      let sender = await Users.findOne({ _id: senderId });
      let receiver = await Users.findOne({ _id: receiverId });
      if (!sender || !receiver) {
        res.send("user not found");
      } else {
        console.log('both user found')
        console.log(receiver)
        if(receiver.contacts.includes(senderId)){
          console.log(receiver.contacts,"loaded") 
        }else{
          console.log('un loaded')
          await Users.findOneAndUpdate({_id:receiverId},{$addToSet:{contacts : senderId}},{new:true})
        }
        let result = await Messages(data);
        await result.save();
        
      }
   
    if(onlineUsers.has(data.receiverId)){
      const receiverSocketId = onlineUsers.get(data.receiverId);
      console.log("receiver socket id : ",receiverSocketId)
      io.to(receiverSocketId).emit('new-message',{
        senderId:data.senderId,
        content:data.content,
        receiverId:data.receiverId
      })
    }
  })
  
  socket.on("disconnect",async () => {
    onlineUsers.delete(socket.userId)
    console.log('socket user is here : ', socket.userId)
    console.log('disconnetion onlin users : ', onlineUsers)
    await Users.findOneAndUpdate({_id:socket.userId},{isOnline:false})
    socket.broadcast.emit("leave", {
      user: users[socket.id],
      message: "this user has left the chat",
    });
    // console.log(res.name, "has left the chat");
  });
});

app.post("/signup", async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  let user = await Users.findOne({ phone: phone });
  if (user) {
    res.send("already registered");
  } else {
    let newUser = new Users({ phone: phone, password: password });
    await newUser.save();
    console.log(newUser);
    if (newUser) {
      let newresponse = await Users.findOne({ phone: phone });
      if (newresponse) {
        res.send({ data: newUser, message: "user created" });
      }
    }
  }
  console.log(user);
});
app.post("/signin", async (req, res) => {
  const { phone, password } = req.body;
  const user = await Users.findOne({ phone: phone });
  console.log(user)
  if (user) {
    if (user.password === password) {
      res.send({ data: user, message: "user logged in" });
    } else {
      res.send({ data: null, message: "wrong password" });
    }
  } else {
    res.send({ data: null, message: "user not found" });
  }
});

app.post("/user-profile", async (req, res) => {
  const { name, id, profile_pic, email, about } = req.body.userData;
  console.log(req.body);
  let user = await Users.findOne({ _id: id });

  if (user) {
    let updateUser = await Users.findOneAndUpdate(
      { _id: id },
      { name: name, email: email, profile_pic: profile_pic, about: about }
    );
    if (updateUser) {
      console.log(updateUser);
      user = await Users.findOne({ _id: id });
      res.send({ user: user, message: "profile updated" });
    } else {
      res.send("something is broken");
    }
  } else {
    res.send("not found");
  }
});
app.post("/add-to-contact", async (req, res) => {
  const { phone, name, userId } = req.body;
  console.log(req.body);
  let user = await Users.findOne({ _id: userId });
  if (user) {
    let newContact = await Users.findOne({ phone: phone });
    if (!newContact) {
      res.send("user not found");
    } else {
      let result = await Users.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { contacts: newContact._id} },
        { new: true }
      );
      console.log(result);
      res.status(200).send("Friend added successfully");
    }
  } else {
    res.send("logged user not found");
  }
});

app.post("/get-contacts", async (req, res) => {
  const { userId } = req.body;
  try {
    let clientUser = await Users.findOne({ _id: userId });
    let contactIds = clientUser.contacts;
    const contacts = await Users.find({ _id: { $in: contactIds } }).select(
      "name email phone profile_pic about isOnline lastLogin"
    );
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

app.post("/send-messages", async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log(req.body);
  try {
    let sender = await Users.findOne({ _id: senderId });
    let receiver = await Users.findOne({ _id: receiverId });
    if (!sender || !receiver) {
      res.send("user not found");
    } else {
      console.log('both user found')
      console.log(receiver)
      if(receiver.contacts.includes(senderId)){
        console.log(receiver.contacts,"loaded") 
      }else{
        console.log('un loaded')
        await Users.findOneAndUpdate({_id:receiverId},{$addToSet:{contacts : senderId}},{new:true})
      }
      let result = await Messages(req.body);
      await result.save();
      
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/get-messages", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let result = await Messages.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { receiverId: senderId, senderId: receiverId },
      ],
    })
      .populate("senderId")
      .populate("receiverId");

    if (result) {
      res.send(result);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

let Time = new Date();
server.listen(PORT, () => {
  console.log(
    "server is running on port",
    PORT,
    " at ",
    Time.getMinutes(),
    ":",
    Time.getSeconds()
  );
});
