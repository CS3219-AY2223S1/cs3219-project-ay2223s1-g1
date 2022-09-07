import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import { io } from "socket.io-client";
import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link} from "react-router-dom";



function UserMatchPage() {
    const [difficulty, setDifficulty] = useState("")

    const socket = io("https://localhost:8001");
    socket.on("connect", () => {
        console.log('socket is connected non client side');
    })

    const handleMatch = async () => {
        console.log(difficulty);
        socket.emit('match', difficulty);
        socket.on('matched room', (room_id) => {
            //go to localhost:8080/room_id
        })
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <TextField
                label="Difficulty"
                variant="standard"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleMatch}>Match</Button>
            </Box>

        </Box>
    );
}

