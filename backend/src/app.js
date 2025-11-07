import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import dbConnection from "./db/dbConnection.js";
import cookieParser from "cookie-parser";

//...........................................................

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import { use } from "react";
import { Socket } from "dgram";

//...........................................................

const app = express();

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

const server = createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
console.log("[SUCCESS] Socket.io initialized with CORS");

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

let onlineUsers = [];
const activeCalls = new Map();

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.emit("me", socket.id);

  socket.on("join", (user) => {
    if (!user || !user.id) {
      console.log("invalid user data on join");
      return;
    }

    socket.join(user.id);
    const existingUser = onlineUsers.find((u) => {
      return u.userId === user.id;
    });
    if (existingUser) {
      existingUser.socketId = socket.id;
    } else {
      onlineUsers.push({
        userId: user.id,
        name: user.name,
        socketId: socket.id,
      });

      io.emit("online-users", onlineUsers);
    }
  });

  socket.on("disconnect", () => {
    const user = onlineUsers.find((u) => {
      return u.socketId === socket.is;
    });
    if (user) {
      activeCalls.remove(user.userId);

      for (const [key, value] of activeCalls.entries()) {
        if (value.with === user.userId) activeCalls.delete(key);
      }
    }

    onlineUsers = onlineUsers.filter((u) => {
      return u.socketId !== socket.id;
    });

    io.emit("online-users", onlineUsers);
    socket.broadcast.emit("Disconnected user", socket.id);
    console.log("Disconnected user", socket.id);
  });

  socket.on("callToUser", (data) => {
    let call = onlineUsers.find((u) => {
      return data.callToUserId === u.userId;
    });
    if (!call) {
      socket.emit("userUnavailable", { message: "User is offline" });
      return;
    }

    io.to(data.callToUserId).emit("callToUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
      email: data.email,
      profileImg: data.profileImg,
    });
  });

  socket.on("reject-call", (data) => {
    io.to(data.to).emit("reject-call", {
      name: data.name,
      profileImg: data.profileImg,
    });
  });

  socket.on("answredCall", (data) => {
    console.log("answercall is working backend side", data);
    io.to(data.to).emit("callAccepted", {
      from: data.from,
      signal: data.signal,
    });
  });
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

//user1

// nikhilyadav.prof@gmail.com
// Manthan20
// nikhil2004

//user2

// ny@gmail.com
// NikhilYadu
// nikhil2004
