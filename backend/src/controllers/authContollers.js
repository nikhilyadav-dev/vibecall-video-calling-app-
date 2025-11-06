import User from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwtToken from "../utils/jwtToken.js";
export const signup = async (req, res) => {
  try {
    let { username, fullname, email, password, profileImg, gender } = req.body;
    const user = await User.findOne({ username });

    console.log("Signup working", user);

    if (user)
      return res
        .status(500)
        .send({ success: false, message: "User already exixt" });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(500)
        .send({ success: false, message: "User alredy exixt with this email" });

    const hashPassword = bcrypt.hashSync(password, 10);
    const maleProfileImg =
      profileImg ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfileImg =
      profileImg ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;

    console.log(maleProfileImg, femaleProfileImg);

    const newUser = new User({
      username,
      fullname,
      email,
      password: hashPassword,
      gender,
      profileImg: gender === "male" ? maleProfileImg : femaleProfileImg,
    });

    console.log("newUser", newUser);

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
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "Email doesn't exist" });
    const passowrdCheck = bcrypt.compareSync(password, user.password || "");
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
      username: user.username,
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
