const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
console.log("env file : ", process.env.URI)
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
const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("socket connected : ",socket.id)
  console.log("connected users line 28: ", onlineUsers)

  socket.emit("connected", { data: "client connected" });
  socket.on('joined',async (user)=> {
    await Users.findOneAndUpdate({_id:user},{isOnline:true})
    console.log(`${user} is online`)
    onlineUsers.set(user,socket.id)
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
  socket.on('typing', (data)=> {
    // console.log(data)
    if(onlineUsers.has(data.receiverId)){
       console.log('onine hai')
       let receiverSocketId = onlineUsers.get(data.receiverId)
       io.to(receiverSocketId).emit('frnd-typing', {isTyping: data.isTyping, frndId: data.userId})
    }else{
      console.log('online nahi hai')
    }
  })

  // })
  socket.on("client-message", async (data) => {
  const { senderId, receiverId, content } = data;

  try {
    // Save the message to the Messages collection
    const newMessage = new Messages({
      sender: senderId,
      receiver: receiverId,
      content: content,
    });
    const savedMessage = await newMessage.save();

    // Check if sender is in the receiver's contacts.
    // Assuming each contact object has an _id field equal to the contact's user id.
    const receiverUser = await Users.findById(receiverId);
    if (receiverUser) {
      const senderAlreadyInContacts = receiverUser.contacts.some(
        (contact) => contact._id.toString() === senderId
      );
      if (!senderAlreadyInContacts) {
        // Add sender to the receiver's contacts if not already added
        await Users.findByIdAndUpdate(
          receiverId,
          { $addToSet: { contacts: { _id: senderId, addedOn: new Date() } } },
          { new: true }
        );
        console.log("Sender added to receiver's contacts");
      }
    }

    // Update last_message for the sender in the receiver's contacts
    const receiverUpdate = await Users.findOneAndUpdate(
      { _id: receiverId, "contacts._id": senderId },
      {
        $set: {
          "contacts.$.last_message": content,
          "contacts.$.date_modified": new Date(),
        },
      },
      { new: true }
    );
    console.log("Receiver update result:", receiverUpdate);

    // Update last_message for the receiver in the sender's contacts
    const senderUpdate = await Users.findOneAndUpdate(
      { _id: senderId, "contacts._id": receiverId },
      {
        $set: {
          "contacts.$.last_message": content,
          "contacts.$.date_modified": new Date(),
        },
      },
      { new: true }
    );
    console.log("Sender update result:", senderUpdate);

    console.log("Last message updated for both users");

    // Emit the message to the receiver if they are online
    if (onlineUsers.has(receiverId)) {
      const receiverSocketId = onlineUsers.get(receiverId);
      io.to(receiverSocketId).emit("new-message", {
        sender: senderId,
        content: content,
        receiver: receiverId,
      });
    }
  } catch (error) {
    console.error("Error handling client-message:", error);
  }
});
  
  
  socket.on("disconnect",async () => {
    console.log('dis online users : ', onlineUsers) 
    onlineUsers.delete(socket.userId)
    console.log('socket user is here : ', socket.userId)
    console.log('disconnetion onlin users : ', onlineUsers)
    await Users.findOneAndUpdate({_id:socket.userId},{isOnline:false})
    let theuser = await Users.findOne({_id:socket.userId});
    let contacts = theuser.contacts;
    contacts.forEach((contact)=> {
      let contactId = contact._id.toString();
      let contactSocketId = onlineUsers.get(contactId);
      if(contactSocketId){
        io.to(contactSocketId).emit('leave',{
          userId:socket.userId,
          message:`${theuser.name} has left the chat`})
        }else{
          console.log("contact not online")
        }
    })

  });
});

app.post("/signup", async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  let user = await Users.findOne({ phone: phone });
  if (user) {
    res.status(409).send("already registered"); // Conflict
    console.log('already regisetered')
  } else {
    let newUser = new Users({ phone: phone, password: password });
    await newUser.save();
    console.log(newUser);
    if (newUser) {
      let newresponse = await Users.findOne({ phone: phone });
      if (newresponse) {
        res.status(201).send({ data: newUser, message: "user created" }); // Created
      }
    }
  }
  console.log(user);
});
app.post('/auth', async (req,res)=>{
  const {userId} = req.body;
  console.log(userId)
  try {
    let user = await Users.findOne({_id:userId});
    if (user) {
      console.log(user)
      return res.status(200).send(user); // 200 for successful retrieval
    } else {
      return res.status(404).send("User not found"); // 404 for missing user
    }
  } catch (error) {
    console.log(error)
  }
})

app.post("/signin", async (req, res) => {
  try {
    console.log("Sign-in request received:", req.body);
    const { phone, password } = req.body;
    const user = await Users.findOne({ phone: phone });
    if (user) {
      if (user.password === password) {
        console.log("User logged in successfully:", user._id);
        res.status(200).send({ data: user, message: "user logged in" }); // OK
      } else {
        console.warn("Wrong password for user:", phone);
        res.status(401).send({ data: null, message: "wrong password" }); // Unauthorized
      }
    } else {
      console.warn("User not found for phone:", phone);
      res.status(404).send({ data: null, message: "user not found" }); // Not Found
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

app.post("/user-profile", async (req, res) => {
  const { name, id, profile_pic, email, about } = req.body.userData;
  let user = await Users.findOne({ _id: id });

  if (user) {
    let updateUser = await Users.findOneAndUpdate(
      { _id: id },
      { name: name, email: email, profile_pic: profile_pic, about: about }
    );
    if (updateUser) {
      user = await Users.findOne({ _id: id });
      return res.status(200).send({ user: user, message: "Profile updated" }); // 200 for successful update
    } else {
      return res.status(400).send("Something is broken"); // 400 for bad request
    }
  } else {
    return res.status(404).send("User not found"); // 404 for missing user
  }
});

app.post("/add-to-contact", async (req, res) => {
  const { phone, name, userId } = req.body;

  try {
    // Find logged-in user by ID
    let user = await Users.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Logged-in user not found" });
    }

    // Find the new contact by phone
    let newContact = await Users.findOne({ phone });
    if (!newContact) {
      return res
        .status(404)
        .json({ success: false, message: "User with this phone not found" });
    }

    // Check if this contact is already added
    // Assuming user.contacts is an array of objects having an _id field
    const isAlreadyAdded = user.contacts.some(
      (contact) =>
        contact._id.toString() === newContact._id.toString()
    );

    if (isAlreadyAdded) {
      return res.status(409).json({
        success: false,
        message: "User is already added in your contacts",
      });
    }

    // If not already added, update the contacts using $addToSet
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $addToSet: { contacts: { _id: newContact._id, addedOn: new Date() } },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Friend added successfully",
      data: updatedUser.contacts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
});

app.post("/remove-contact", async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    // Find the user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove the contact from the user's contacts array
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { $pull: { contacts: { _id: friendId } } },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: "Contact removed successfully",
        data: updatedUser.contacts,
      });
    } else {
      return res.status(400).json({ success: false, message: "Failed to remove contact" });
    }
    
  } catch (error) {
    
  }
})

app.post('/get-temp', async (req,res)=> {
  const {userId} = req.body;
  try {
    let result = await Users.findOne({_id:userId})
    if (result) {
      return res.status(200).send(result); // 200 for successful retrieval
    } else {
      return res.status(404).send("User not found"); // 404 for missing user
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error"); // 500 for server errors
  }
})

app.post("/get-contacts", async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get the contact IDs from the user's contacts
    const contactIds = user.contacts.map((contact) => contact._id);

    // Fetch the contact details from the Users collection
    const contacts = await Users.find({ _id: { $in: contactIds } }).select(
      "name email phone profile_pic about isOnline lastLogin"
    );

    // Combine the `contacts` and `user.contacts` arrays
    const combinedContacts = user.contacts.map((contact) => {
      const matchingContact = contacts.find((c) => c._id.toString() === contact._id.toString());
      return { ...contact.toObject(), ...matchingContact.toObject() };
    });

    // Sort the combined contacts array by `date_modified` (latest first)
    const sortedContacts = combinedContacts.sort((a, b) => {
      const dateA = new Date(a.date_modified || 0); // Default to 0 if `date_modified` is undefined
      const dateB = new Date(b.date_modified || 0);
      return dateB - dateA; // Sort in descending order
    });

    // Send the sorted array as the response
    res.status(200).send({ success: true, contacts: sortedContacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

app.post("/send-messages", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let sender = await Users.findOne({ _id: senderId });
    let receiver = await Users.findOne({ _id: receiverId });
    if (!sender || !receiver) {
      return res.status(404).send("User not found"); // 404 for missing users
    } else {
      if (!receiver.contacts.includes(senderId)) {
        await Users.findOneAndUpdate(
          { _id: receiverId },
          { $addToSet: { contacts: senderId } },
          { new: true }
        );
      }
      let result = await Messages(req.body);
      await result.save();
      return res.status(201).send("Message sent successfully"); // 201 for successful creation
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error"); // 500 for server errors
  }
});

app.post("/get-messages", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let result = await Messages.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { receiver: senderId, sender: receiverId },
      ],
    })
      .populate("sender")
      .populate("receiver");

    if (result) {
      return res.status(200).send(result); // 200 for successful retrieval
    } else {
      return res.status(404).send("Messages not found"); // 404 for no messages
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error"); // 500 for server errors
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
