const express = require('express');//* it allow us to easyly handle http request   
const mongoose = require('mongoose'); //*
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const jobRoute = require('./routes/jobs')
const bookMarkRoute = require('./routes/bookmark')
const dotenv = require('dotenv');

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

app.get('/', (req, res)=>{
    res.send("Hello User");
})

app.listen(process.env.PORT || 50001, console.log("App is running at port " + process.env.PORT || 5001)) //*

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWE2N2QyNjNhMTUwMjZkMGQzYzc5NSIsImlzQWRtaW4iOnRydWUsImlzQWdlbnQiOnRydWUsImlhdCI6MTY4ODk5ODI2NywiZXhwIjoxNjkwODEyNjY3fQ.TTSvuLyqIFW97J2nXAqHHOw8z5TjQS56UWFiyCHgsPM