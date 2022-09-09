import {
    Box,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

function PendingMatchPage() {
    const location = useLocation()
    const { diff } = location.state

    const socket = io("https://localhost:8001");
    socket.on("connect", () => {
        console.log('socket is connected on client side');
    });

    /*const handleMatch = async () => {
        console.log(diff);
        socket.emit('match', diff);
        socket.on('matched room', (room_id) => {
            //go to localhost:8080/room_id
        })
    }*/

    // Call to backend with difficulty level to match users
    // Front end to display relevant message and wait for 30 seconds or a match
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Will match you to a user here!</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Chosen Difficulty: {diff}</Typography>
        </Box>
    )
}

export default PendingMatchPage;