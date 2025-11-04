import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";
export const isLoggedIn = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwt ||
      req.headers.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("jwt="))
        ?.split("=")[1];
    if (!token)
      return res
        .status(500)
        .send({ success: false, message: "Anauthorize User" });
    const decode = jwt.verify(token, process.env.JWT_SCRETETOKEN);

    if (!decode) {
      return res.status(500).send({ success: false, message: "Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    console.log(user);
    if (!user)
      return res
        .status(500)
        .send({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error,
    });
    console.log(error);
  }
};
