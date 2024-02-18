const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      // "Bearer afqwjfad6lkv9aerfjqerjg7wqefjq3kegpoakef1woenr"

      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDFlNzYyNTNmZmY1NDk4ZjAyNTY4MCIsImlhdCI6MTcwODI1NTA3NCwiZXhwIjoxNzEwODQ3MDc0fQ.8Lxrutjg4g3KyvRW_LhcNh53oyvJysYT91h6cKaTB0g

      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    res.status(401).json({ error: "No token" });
  }
};

module.exports = { protect };
