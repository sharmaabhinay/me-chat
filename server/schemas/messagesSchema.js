const mongoose = require('mongoose');
require('dotenv').config();
let LocalUrl = process.env.URI;
// let LocalUrl = 'mongodb://localhost:27017/ReactChat';
let atlas = 'mongodb+srv://abhiisharma76:Password76@cluster0.zzmfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let resumedC = 'mongodb+srv://abhiisharma76:Password76@cluster0.zzmfe.mongodb.net/?appName=Cluster0'

let newUrl = 'mongodb+srv://abhiisharma76:meeshoclone@cluster0.jzk2fxs.mongodb.net/meeshoclone?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(resumedC)
    .then(() => console.log('messages mongoose connected'))
    .catch((err) => console.log(err));

const messageSchema = mongoose.Schema({
    read:{type:Boolean, default:true},
  sender:{required:true, type:String},
  receiver: {required:true, type:String},
  content: {
    type: String,
    required: true,
  },
  content_type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Messages", messageSchema);