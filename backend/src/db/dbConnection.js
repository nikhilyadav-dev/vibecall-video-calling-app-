import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    const connectionOnDb = await mongoose.connect(
      "mongodb+srv://nikhilyadav_db_user:Fot8jIl111PMGHUf@cluster0.hdjbmyr.mongodb.net/"
    );

    console.log(`MONGO Connected DB HOst: ${connectionOnDb.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
