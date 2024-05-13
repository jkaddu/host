const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) return res.sendStatus(401);
  console.log(authHeaders); // Should look like so: Bearer Token
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // status code of forbidden/invalid token
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
