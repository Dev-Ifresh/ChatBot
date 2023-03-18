//Import dependencies

require("dotenv").config();
const PORT = process.env.PORT

const mongoose = require("mongoose");
const session = require ("express-session");
const MongoStore = require("connect-mongo")
const { v4: uuid } = require("uuid");
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
// app.use("/static", express.static('./public'));
const httpServer = http.createServer(app);


require("./db").connectToMongoDB();

// linking the httpServer to socketServer
const io = new Server(httpServer, {
    cors:{origin:`http://localhost:${PORT}`}
});


const sessionMiddleware = session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure:false, maxAge: 1314900000 },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://Isaacadun:Isaakadun@cluster0.ki7ilh4.mongodb.net/?retryWrites=true&w=majority"})//external database to store the session
});

app.use(sessionMiddleware);

// Letting our socket recognize the session middleware
io.use((socket, next)=> {
    sessionMiddleware(socket.request, {}, next)
})


//create a connection listener if a new client is trying to connect
io.on("connection", (socket)=>{
    console.log(socket.id);
    const session = socket.request.session;
    console.log(session.userId);
    session.userId = uuidv4();
    console.log(session.userId);
    
});



// const bodyParser = require('body-parser');

//connect to MongoDb Database





// Start server
httpServer.listen( PORT, () => {
    console.log(`Welcome to http://localhost:${PORT}`)
});
