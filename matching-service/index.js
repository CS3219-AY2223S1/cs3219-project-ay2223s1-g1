import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import {matchUser} from "./controller/socket-controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

/*const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000"
    }
 });*/

 const io = new Server(httpServer);

httpServer.listen(8001);

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log('socket connected on server side');
    /*socket.on('match', (data) => {
        //function to match two users
        id_value = matchUser(socket.id, data);
        socket.to(socket.id).emit('matched room', id_value);
    });*/
});
