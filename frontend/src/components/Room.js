import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@mui/material";
import { useLocation, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import {useState} from "react";

function Room() {
    const location = useLocation()
    const { name, matchName } = location.state
    const [isLeave, setIsLeave] = useState(false)
    const [matchLeaves, setMatchLeaves] = useState(false)

    const socket = io("http://localhost:8001");

    socket.on("connect", () => {
        socket.emit("store", name, socket.id);

        socket.on('match leave', (message) => {
            setMatchLeaves(true)
            console.log(message)
        })
    })

    const handleLeave = async() => {
        socket.emit("leave", name, matchName);
        setIsLeave(true);
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>

            <Button onClick={handleLeave}>Leave room</Button>

            {isLeave ? <Navigate component={Link} to="/dashboard" state={{name: name}}/>:null}
            <Dialog open={matchLeaves}>
                <DialogContent>
                    <DialogContentText>match has left</DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button component={Link} to="/dashboard" state={{name: name }}>Leave</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Room;


