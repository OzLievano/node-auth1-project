const express = require('express');

const server = express();
const session = require('express-session');
const connectSessionStore = require('connect-session-knex')(session);
const usersRouter = require('../api/users-router/');
const authRouter = require('../api/auth/auth-router');


const sessionConfig = {
    name: "thunderdome",
    secret: " in the bleak midwinter",
    cookie:{
        maxAge: 60 * 60 * 1000, // lasts 1 hour
        secure : false, //is HTTPS required to send apirequest,
        httpOnly: true, // allow cookie to be viewable by JS in browser
    },
    resave:false,
    saveUninitialize:false,
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename:"sessions",
        sidfieldname:"sid",
        createtable:true,
        clearInterval: 60*60*1000
    })
}
server.use(express.json());
server.use(session(sessionConfig))


server.use("/api/users",usersRouter);
server.use("/api/auth",authRouter);


server.get("/", (req,res)=>{
    res.json({api: "up"});
});

module.exports = server;