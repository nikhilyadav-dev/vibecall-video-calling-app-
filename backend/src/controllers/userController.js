import User from "../schema/userSchema.js";

export const getAllUsers = async (req, res) => {
  console.log("call recieved");
  const currentUserId = req.user._id;
  if (!currentUserId) {
    return res.status(500).send({ success: false, message: "Unauthorized" });
  }

  try {
    const users = await User.find(
      { _id: { $ne: currentUserId } },
      "profileImg username email"
    );
    res.status(200).send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
