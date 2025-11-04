import express from "express";
import { createServer } from "http";
import cors from "cors";
import connectToSoket from "./controllers/soketManager.js";
import dotenv from "dotenv";
import dbConnection from "./db/dbConnection.js";
import cookieParser from "cookie-parser";

//...........................................................

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

//...........................................................

const app = express();
const server = createServer(app);
const io = connectToSoket(server);

//...........................................................

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by cros"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

//...........................................................

app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(express.json({ limit: "40kb" }));
app.set("port", 8000);
dotenv.config();
app.use(cookieParser());

//...........................................................

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.get("/", (req, res) => {
  res.json({ message: "Working" });
});

//...........................................................

const start = async () => {
  try {
    await dbConnection();
    server.listen(app.get("port"), () => {
      console.log("LISNING ON PORT 8000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
