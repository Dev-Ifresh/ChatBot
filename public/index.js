
// Setting up the socket on the clientside
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

//connecting the clientside to the server
const socket = io("http://localhost:5500");

socket.on("connect", () => {
    console.log(socket.id)
})