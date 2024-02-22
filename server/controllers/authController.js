const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, salt);
  const user = await User.create({ ...req.body, password: hashedPwd });

  res.status(200).json({
    _id: user.id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Incorrect password!" });
    }
  } else {
    res.status(401).json({ error: `User with name ${username} not found` });
  }
};

module.exports = { login, register };
