import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  try {
    let { username, fullname, email, password, pofileImg, gender } = req.body;
    const user = User.findOne({ username });

    if (user)
      return res
        .status(500)
        .send({ success: false, message: "User already exixt" });

    const emailCheck = await User.findOne({ email });
    if (email)
      return res
        .status(500)
        .send({ success: false, message: "User alredy exixt with this email" });

    const hashPassword = bcrypt.hashSync(password, 10);
    const maleProfileImg =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfileImg =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      username,
      fullname,
      email,
      password: hashPassword,
      gender,
      pofileImg: gender === "male" ? maleProfileImg : femaleProfileImg,
    });

    if (newUser) {
      await newUser.save();
    } else {
    }
  } catch (error) {}
};

export const home = (req, res) => {
  res.send("Home Route");
};
