import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwtToken from "../utils/jwtToken.js";
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
      jwtToken(newUser._id, res);
    } else {
      res.status(500).send({ success: false, message: "Invalid user data" });
    }

    res.status(200).send({
      _id: newUser._id,
      username: newUser.username,
      fullname: newUser.fullname,
      email: newUser.email,
      prifleImg: newUser.profileImg,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    let { email, passowrd } = req.body;
    const user = await findOne({ email });
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "Email doesn't exist" });
    const passowrdCheck = bcrypt.compareSync(passowrd, user.passowrd || "");
    if (!passowrdCheck)
      return res
        .status(500)
        .send({ success: false, message: "Password doesn't match" });
    const token = jwtToken(user._id, res);
    res.status(200).send({
      _id: user._id,
      fullname: user.fullname,
      profileImg: user.profileImg,
      email: user.email,
      message: "Successfull Login",
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
    });
    res.status(200).send({ message: "User logout" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};

export const home = (req, res) => {
  res.send("Home Route");
};
