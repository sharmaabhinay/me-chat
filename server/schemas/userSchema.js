const mongoose = require("mongoose");
require("dotenv").config();
let LocalUrl = process.env.URI;
// let LocalUrl = "mongodb://localhost:27017/ReactChat";
let atlas = 'mongodb+srv://abhiisharma76:Password76@cluster0.zzmfe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
let newUrl =
  "mongodb+srv://abhiisharma76:meeshoclone@cluster0.jzk2fxs.mongodb.net/meeshoclone?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(atlas)
  .then(() => console.log("user mongoose connected"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  phone: {
    type: String,
  },
  userId: String,
  profile_pic: String,
  about: String,
  location: String,
  name: String,
  email: String,
  password: String,
  lastLogin: String,
  registered_on: {
    type: Date,
    default: Date.now,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  contacts: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Reference to the Users model
      },
      name: String,
      addedOn: { type: Date, default: Date.now },
      last_message: {type:String,default:'hii'},
      last_online_status: String,
      last_message_status: String,
      date_modified: { type: Date },
      isBlocked: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Users", userSchema);
