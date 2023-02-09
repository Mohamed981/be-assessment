const jwt = require("jsonwebtoken");

const jwtSign = (params) => {
  return jwt.sign(
    {
      userid: params.id,
      name:params.name,
      password:params.password
    },
    process.env.SECRET
  );
};
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw "UNAUTHORIZED";
    const user = await jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.userid=user.userid;
    next();
  } catch {
    return res.send({ error: "UNAUTHORIZED" });
  }
};
module.exports = { jwtSign, verifyToken };
