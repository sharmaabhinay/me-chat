const mongoose = require("mongoose");
// let LocalUrl = process.env.URI;
let LocalUrl = "mongodb://localhost:27017/ReactChat";

let newUrl =
  "mongodb+srv://abhiisharma76:meeshoclone@cluster0.jzk2fxs.mongodb.net/meeshoclone?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(LocalUrl)
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

  isOnline: {
    type: Boolean,
    default: false,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      name: String,
      addedOn: { type: Date, default: Date.now },
      last_message: String,
      last_online_status: String,
    },
  ],
});
module.exports = mongoose.model("Users", userSchema);
// {
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users",
//   },
// name:String,
// addedOn: {type:Date, default: Date.now},
// last_message:String,
// last_online_status : String,

// },
