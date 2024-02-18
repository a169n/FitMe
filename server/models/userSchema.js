const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    age: Number,
    isMale: Boolean,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
