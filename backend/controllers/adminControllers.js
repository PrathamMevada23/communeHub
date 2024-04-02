const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    await User.findByIdAndDelete(userId);
    res.status(200).send("user deleted!")
  } catch (error) {
    console.error("error deleting user:", error)
    res.status(500).send("Server Error");
  }
}

module.exports = { getAllUsers };
