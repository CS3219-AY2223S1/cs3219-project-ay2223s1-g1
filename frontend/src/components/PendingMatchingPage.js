import {
    Box,
    Typography, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Button,
} from "@mui/material";
import { DASHBOARD, ROOM, URL_MATCHING_SVC } from "../configs";
import { useLocation, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../util/userContext";

function PendingMatchPage() {
    const location = useLocation()
    const { diff } = location.state
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext)
    const [roomId, setRoomId] = useState("")
    const [foundMatch, setFoundMatch] = useState(false)
    const [matchName, setMatchName] = useState("")
    const [noMatchFound, setNoMatchFound] = useState(false);

    useEffect(() => {
        const socket = io(URL_MATCHING_SVC);

        socket.on("connect", () => {
            console.log('socket is connected on client side', socket.id, 'with this id');

            socket.emit('match', user.username, diff);

            const timeout = setTimeout(() => {
                socket.emit('delete', diff);
                setNoMatchFound(true);
            }, 30000);

            socket.on('room', (match_name, val) => {
                clearTimeout(timeout);
                setFoundMatch(true);
                setMatchName(match_name);
                var url = ROOM + '/' + val;
                setRoomId(url);
            });
    
            socket.on('delete confirm', (val) => {
                console.log(val, 'is deleted');
            });

        });
    });

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Will match you to a user here!</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Chosen Difficulty: {diff}</Typography>
            {foundMatch ? <Navigate to={roomId} state={{name: user.username, matchName: matchName}}/>:null}
            
            <Dialog open={noMatchFound}>
                <DialogContent>
                    <DialogContentText>Sorry, we could not find a match for you!</DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button component={Link} to={DASHBOARD}>Leave</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default PendingMatchPage;
