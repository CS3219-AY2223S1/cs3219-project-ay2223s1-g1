import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import {matchUser, deleteUserID} from "./controller/socket-controller.js";
import User from '../matching-service/models/user.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3001"
    }
 });

httpServer.listen(8001);

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log('socket connected on server side');

    socket.on('match', (name, diff) => {
        matchUser(socket.id, name, diff).then((val) => {
            if (val != null) {
                var match_name = val[0];
                var socket_id = val[1];
                //console.log('room send is ', socket.id);
                //console.log('response send is ', val);
                socket.to(val).emit('room', name, socket_id);
                socket.emit('room', match_name, socket_id);   
            }
        });
    });

    socket.on('delete', (diff) => {
        deleteUserID(socket.id, diff);
        socket.emit('delete confirm', socket.id + ' is deleted');
    });
});

/*matchUser('hello1', 'name', 'easy').then((val) => {
    console.log(val);
});*/


