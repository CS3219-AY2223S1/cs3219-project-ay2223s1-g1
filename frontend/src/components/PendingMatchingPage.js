import {
    Box,
    Typography, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
    DialogTitle,
} from "@mui/material";
import { useLocation, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import {useState, useEffect} from "react";

function PendingMatchPage() {
    const location = useLocation()
    const { diff, name } = location.state

    const [roomId, setRoomId] = useState("")
    const [foundMatch, setFoundMatch] = useState(false)
    const [matchName, setMatchName] = useState("")
    const [noMatchFound, setNoMatchFound] = useState(false);

    useEffect(() => {
        const socket = io("http://localhost:8001");

        socket.on("connect", () => {
            console.log('socket is connected on client side', socket.id, 'with this id');

            socket.emit('match', name, diff);

            const timeout = setTimeout(() => {
                socket.emit('delete', diff);
                setNoMatchFound(true);
            }, 30000);

            socket.on('room', (match_name, val) => {
                clearTimeout(timeout);
                setFoundMatch(true);
                setMatchName(match_name);
                var url = '/room/' + val;
                setRoomId(url);
            });
    
            socket.on('delete confirm', (val) => {
                console.log(val, 'is deleted');
            });

        });
    }, []);


    // Call to backend with difficulty level to match users
    // Front end to display relevant message and wait for 30 seconds or a match
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Will match you to a user here!</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Chosen Difficulty: {diff}</Typography>
            {foundMatch ? <Navigate to={roomId} state={{name: name, matchName: matchName}}/>:null}
            
            <Dialog open={noMatchFound}>
                <DialogContent>
                    <DialogContentText>sorry no match is found</DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button component={Link} to="/dashboard" state={{name: name }}>Leave</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PendingMatchPage;
