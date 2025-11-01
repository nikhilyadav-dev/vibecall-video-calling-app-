import jwt from "jsonwebtoken";

const jwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SCRETETOKEN, {
    expiresIn: "30d",
  });
  res.cookies("token", token, {
    maxAge: 30 * 24 * 24 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
  });

  return token;
};

export default jwtToken;
