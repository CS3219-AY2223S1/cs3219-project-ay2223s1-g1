import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

var sessionHash = {}

app.get('/', (req, res) => {
    res.send('Hello World from chat-service');
});

const httpServer = createServer(app)

const io = new Server(httpServer, { 
    cors: { origin: "http://localhost:3000" }
 });

httpServer.listen(8002);

io.on("connection", (socket) => {

    socket.on('store', (name, id) => {
        sessionHash[name] = id;
    });

    socket.on('send', (matchName, text) => {
        const matchId = sessionHash[matchName]
        socket.to(matchId).emit('receive', text);
    })
});