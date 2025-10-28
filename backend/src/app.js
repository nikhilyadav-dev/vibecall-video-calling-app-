import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import cors from "cors";
import connectToSoket from "./controllers/soketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSoket(server);

app.use(cors());
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(express.json({ limit: "40kb" }));
app.set("port", 8000);

const start = async () => {
  const connectionOnDb = await mongoose.connect(
    "mongodb+srv://nikhilyadav_db_user:Fot8jIl111PMGHUf@cluster0.hdjbmyr.mongodb.net/"
  );

  console.log(`MONGO Connected DB HOst: ${connectionOnDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISNING ON PORT 8000");
  });
};

start();
