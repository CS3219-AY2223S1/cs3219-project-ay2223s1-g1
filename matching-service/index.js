import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { matchUser, deleteUserID } from "./controller/socket-controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

var sessionHash = {};

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

const io = new Server(httpServer, { 
    cors: { origin: "http://localhost:3000" }
 });

httpServer.listen(8001);

io.on("connection", (socket) => {
    console.log('Socket connected on server side with ID:', socket.id);

    socket.on('match', (name, diff) => {
        matchUser(socket.id, name, diff).then((val) => {
            if (val != null) {
                if (val[0] === -1) {
                    console.log("Error in matching service socket controller - ", val[1])
                } else {
                    var match_name = val[0];
                    var socket_id = val[1];

                    socket.to(val).emit('room', name, socket_id);
                    socket.emit('room', match_name, socket_id);
                }
            }
        });
    });

    socket.on('delete', (diff) => {
        deleteUserID(socket.id, diff);
        socket.emit('delete confirm', socket.id + ' is deleted');
    });

    socket.on('store', (name, id) => {
        sessionHash[name] = id
    })
    socket.on('leave', (user, match_user) => {
        const match_user_id = sessionHash[match_user]
        socket.to(match_user_id).emit('match leave', user + " is leaving the room");
    })
});

