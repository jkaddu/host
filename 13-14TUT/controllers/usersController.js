const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found." });

  res.json(users);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required." });

  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user)
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} is not on record.` });

  res.json(user);
};

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user)
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} is not on record.` });

  if (req.body?.username) user.username = req.body.username;
  if (req.bpdy?.password) user.password = req.body.password;
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required." });

  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user)
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} is not on record.` });

  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
