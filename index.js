const express = require('express');//* it allow us to easyly handle http request   
const mongoose = require('mongoose'); //*
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const jobRoute = require('./routes/jobs')
const bookMarkRoute = require('./routes/bookmark')
const messageRoute = require('./routes/messages')
const chatRoute = require('./routes/chat')
const dotenv = require('dotenv');
const { Socket } = require('socket.io');
const user = require('./models/user');

const app = express(); //* instance of express
dotenv.config();
mongoose.connect(process.env.MONGO_URL) //* 
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err))

app.use(express.json()); // enables the parsing of JSON data from incoming HTTP requests
app.use('/api/', authRoute)
app.use('/api/users', userRoute)
app.use('/api/jobs', jobRoute)
app.use('/api/bookmark', bookMarkRoute)
app.use('/api/chats', chatRoute)
app.use('/api/messages', messageRoute)

app.get('/', (req, res) => {
    res.send("Hello User");
})

const server = app.listen(process.env.PORT || 50001, console.log("App is running at port " + process.env.PORT || 5001)) //*

const IO = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {  // here we set origin from where we access our server

        // for localhost
        // origin : "http://localhost:3000/" 
        // hosted server
        origin: "https://jobappserver-production.up.railway.app/"
    }
});

IO.on("connection", (socket) => {
    console.log("Connected to sockets.");

    socket.on('setup', (userId) => {
        socket.join(userId);
        socket.broadcast.emit("online-user", userId); // this we will notify to all usre that this particular user is online
        console.log(userId);
    });

    socket.on('typing', (room) => {
        console.log("typing");
        console.log("room");
        socket.to(room).emit('typing', room);
    });

    socket.on('stop typing', (room) => {
        console.log("stop typing");
        console.log("room");
        socket.to(room).emit('stop typing', room);
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined : " + room);
    }) 

    socket.on("new message", (newMessgeRecieved) => {
        var chat = newMessgeRecieved.chat;
        console.log(`chat : ${chat}`);

        var room = chat._id;

        var sender = newMessgeRecieved.sender;

        if (!sender || sender._id) {
            console.log("Sender not defiend");
            return;
        }
        var senderId = sender._id;
        console.log(`Message senderId : ${senderId}`);

        const users = chat.users;

        if (!users) {
            console.log("User not found");
            return;
        }

        // after passing through all the if statement then we will emit the message back 
        socket.to(room).emit('message recieved', newMessgeRecieved);
        socket.to(room).emit('message sent', "New message");
        
    });


    socket.off("setup", (userId)=>{
        console.log("User offline");
        socket.leave(userId)
    })

})

