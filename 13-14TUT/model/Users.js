const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
    Edititor: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken,
});

module.exports = mongoose.model("User", userSchema);
