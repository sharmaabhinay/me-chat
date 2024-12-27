const mongoose = require('mongoose');
// let LocalUrl = process.env.URI;
let LocalUrl = 'mongodb://localhost:27017/ReactChat';
let atlas = 'mongodb+srv://abhiisharma76:Password76@cluster0.zzmfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

let newUrl = 'mongodb+srv://abhiisharma76:meeshoclone@cluster0.jzk2fxs.mongodb.net/meeshoclone?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(atlas)
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
    readingTime:{type: Date},
    status:{
        type: String,
        enum:['sent','delivered','read'],
        default:'sent'
    },
    deleted:Boolean,
    deletedBy:String,
    deletedTime:String,



    
})
module.exports = mongoose.model("Messages",messagesSchema)