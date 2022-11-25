const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
    return res.status(404).send({
      message: "email already exist",
      status: false,
    });
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck)
    return res.status(404).send({
      message: "username already exist",
      status: false,
    });
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({user: user.username}, process.env.SECRET_KEY, {
      expiresIn: '48h'
    })
    return res.status(200).send({
      message: "Successfull Created User",
      data: user,
      status: true,
      token: token
    });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      message: "email invalid",
      status: false,
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(404).send({
      message: "password invalid",
      status: false,
    });
  }
  if (user && isPasswordValid) {
    delete user.password;
    const token = jwt.sign({ user: user.username }, process.env.SECRET_KEY, {
      expiresIn: "48h",
    });
    return res.json({
      status: true,
      token: token,
      user: user,
    });
  }
};

module.exports.listUser = async (req, res) => {
  const user = await User.find();
  return res.status(200).send({
    message: "List User",
    data: user,
  });
};
