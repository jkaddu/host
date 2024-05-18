const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Status code of no content to send back
  const refreshToken = cookies.jwt;
  //  Checkiing if refreshToken is in database(DB)
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in the database(DB)
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // { secure: true } works for https, use in production instead of { httpOnly: true}
  res.sendStatus(204);
};

module.exports = { handleLogout };
