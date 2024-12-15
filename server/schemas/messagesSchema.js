const mongoose = require('mongoose');
// let LocalUrl = process.env.URI;
let LocalUrl = 'mongodb://localhost:27017/ReactChat';

let newUrl = 'mongodb+srv://abhiisharma76:meeshoclone@cluster0.jzk2fxs.mongodb.net/meeshoclone?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(LocalUrl)
    .then(() => console.log('messages mongoose connected'))
    .catch((err) => console.log(err));

const messagesSchema = mongoose.Schema({
    m_id:String,
    senderId:String,
    receiverId:String,
    content:String,
    sentTime:{
        type:Date,
        default:Date.now()
    },
    readingTime:String,
    readStatus:Boolean,
    deleted:Boolean,
    deletedBy:String,
    deletedTime:String,



    
})
module.exports = mongoose.model("Messages",messagesSchema)