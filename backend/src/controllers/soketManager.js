import { Server } from "socket.io";

const connectToSoket = (server) => {
  const io = new Server(server);
  return io;
};

export default connectToSoket;
