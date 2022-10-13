import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    TextField,
    Switch,
    Grid
    
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
    const [checked, setChecked] = useState(true);

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
        console.log('switch is', checked);
        socketChat.emit('send', matchName, text);

    }
    
    const handleLeave = async() => {
        socket.emit("leave", name, matchName);
        setIsLeave(true);
    }
    

    return (
        <Box display={"flex"} flexDirection={"column"} width={"80%"}>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                <Box width={"50%"}>
                    <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
                    <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>
                </Box>

                <Box width={"50%"}>
                    <Switch
                        checked={checked}
                        onChange={(e) => setChecked(!checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />

                    {checked 
                        ? <div style={{overflowY:"auto"}}>
                            <Box component="div" flex={1} flexDirection="column" display="flex" p={1} width={'90%'} height={50}>
                                {messages.map((value) => {
                                const boolean = value[0];
                                const mess = value[1];
                                if (boolean) {
                                    return <Grid container>
                                            <Box typography='body2' bgcolor="#e8eaf6" textAlign='left' width={'auto'} height={'auto'}>{mess}</Box>
                                        </Grid>        
                                } else {
                                    return <Grid container justifyContent="flex-end">
                                            <Box typography='body2' bgcolor="#ede7f6" textAlign='right' width={'auto'} height={'auto'}>{mess}</Box>
                                        </Grid>
                                }
                            })}
                            </Box>
                        </div>
                        : <Typography variant="body2">Open Chat</Typography>
                    }
                    <TextField
                    label="Message"
                    variant="standard"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{marginBottom: "1rem"}}
                    autoFocus
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </Box>
            </Box>

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


