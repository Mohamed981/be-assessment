const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const number = require("../utils/codeGenerator");
const nodemailer = require("../services/nodemailer.service");
const jwtService = require("../utils/jwt");

register = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    const verificationCode = number();

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      verificationCode: verificationCode,
    });
    res.send(nodemailer(req.body.email, verificationCode));
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
};
const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwtService.jwtSign(user._id);
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

const verifyUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log(req.body);
  if (!user) {
    res.send({ status: "error", message: "Invalid email" });
  }
  if (user.verificationCode !== req.body.verificationCode)
    res.send({ status: "error", message: "Invalid verification code" });
  user.isVerified = true;
  await user.save();

  const token = jwtService.jwtSign({
    id: user._id,
    name: user.name,
    password: user.password,
  });
  res.send({ status: "ok", token: token });
};
module.exports = { register, login, verifyUser };
