import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
} from "@mui/material";
import { useLocation, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";
import {useState, useEffect} from "react";

function Room() {
    const location = useLocation()
    const { name, matchName, roomId } = location.state
    const [isLeave, setIsLeave] = useState(false)
    const [matchLeaves, setMatchLeaves] = useState(false)
    const [text, setText] = useState("")
    const [messages, setMessage] = useState([])

    const socket = io("http://localhost:8001");
    const socketChat = io("http://localhost:8002");

    useEffect( () => {
        socket.on("connect", () => {
            socket.emit("store", name, socket.id);
    
            socket.on('match leave', (message) => {
                setMatchLeaves(true)
                console.log(message)
            })
        });

        
    
    }, []);

    socketChat.on('connect', () => {
        socketChat.emit('store', name, socketChat.id);

        socketChat.on('receive', (message) => {
            console.log(message);
            const info = [true, message];
            setMessage([...messages, info]);
            console.log(messages);
        });
    });

    const sendMessage = async() => {
        const info = [false, text];
        setMessage([...messages, info]);
        console.log(messages);
        socketChat.emit('send', matchName, text);

    }
    
    const handleLeave = async() => {
        socket.emit("leave", name, matchName);
        setIsLeave(true);
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>
            <div style={{ width: 200, height: 200, overflowY:"auto"}}>
                <Box component="div" flex={1} flexDirection="column" display="flex" p={2}>
                    {messages.map((value) => {
                        const boolean = value[0];
                        const mess = value[1];
                        if (boolean) {
                            return <Typography variant="body2">{mess}</Typography>    
                        } else {
                            return <Typography variant="body2">{mess}</Typography>    
                        }
                    })}
                </Box>
            </div>
            
            <TextField
                label="Message"
                variant="standard"
                value={text}
                onChange={(e) => setText(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Button onClick={sendMessage}>Send</Button>

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


