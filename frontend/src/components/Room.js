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
import { TextArea } from "@progress/kendo-react-inputs";
import Select from 'react-select';
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_SUCCESS} from "../constants";
import {URL_QUESTION_SVC} from "../configs";
import useAxios from "../util/useAxios";

function Room() {
    const location = useLocation()
    const axios = useAxios()
    const { name, matchName , diff} = location.state
    const [isLeave, setIsLeave] = useState(false)
    const [matchLeaves, setMatchLeaves] = useState(false)
    const [string, setString] = useState("")
    const [messages, setMessage] = useState([])
    const [checked, setChecked] = useState(true);
    const [text, setText] = useState("")
    const [question,setQuestion]= useState("")
    const [langChoice, setLangChoice] = useState("free")
    const languageChoices = [
        {label: 'Freestyle', value: 'Freestyle'},
        {label: 'C', value: 'C'},
        {label: 'C++', value: 'C++'},
        {label: 'GoLang', value: 'GoLang'},
        {label: 'Haskell', value: 'Haskell'},
        {label: 'Java', value: 'Java'},
        {label: 'Javascript', value: 'Javascript'},
        {label: 'OCaml', value: 'OCaml'},
        {label: 'Prolog', value: 'Prolog'},
        {label: 'Python', value: 'Python'},
        {label: 'Scala', value: 'Scala'},
    ];

    const socket = io("http://localhost:8001");
    const socketChat = io("http://localhost:8002");

    useEffect( () => {
        socket.on("connect", () => {
            socket.emit("store", name, socket.id);
    
            socket.on('match leave', (message) => {
              setMatchLeaves(true)
              console.log(message)
            })

            socket.on('update_lang_choice', (new_lang_choice) => {
              setLangChoice(new_lang_choice)
            })

            socket.on('update_text', (text) => {
              setText(text)
            })
            socket.on('update_question', (questionData) => {
                setQuestion(questionData)
              })
        });
        // eslint-disable-next-line    
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
        const info = [false, string];
        setMessage([...messages, info]);
        socketChat.emit('send', matchName, string);   
    }

    
    const handleLeave = async() => {
        socket.emit("leave", name, matchName);
        setIsLeave(true);
    }
    

    const onChangeLangChoice = newLangChoice => {
        setLangChoice(newLangChoice.value);
        socket.emit("update_match_lang_choice", matchName, newLangChoice.value);
    }

    const onChangeText = new_text => {
        setText(new_text.value);
        socket.emit("update_match", matchName, new_text.value);
    }

    const handleFind = async () => {
        const res = await axios.get(URL_QUESTION_SVC+`/${diff}`,{withCredentials:true,credentials: "include"}).catch((err) => {
            if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                console.log(err.response.data.message)
            }
        })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setQuestion(res.data[0])
            socket.emit("update_question", matchName, res.data[0]);
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
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
                    value={string}
                    onChange={(e) => setString(e.target.value)}
                    sx={{marginBottom: "1rem"}}
                    autoFocus
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </Box>
            </Box>
            <br></br>
            {question?<Typography variant={"h6"} marginBottom={"0.5rem"}>Question details is as follows:</Typography>:null}
            {question?<Typography variant={"h6"} marginBottom={"0.5rem"}>Index: {question.index}</Typography>:null}
            {question?<Typography variant={"h6"} marginBottom={"0.5rem"}>Title: {question.title}</Typography>:null}
            {question?<Typography variant={"h6"} marginBottom={"0.5rem"}>Question: {question.question}</Typography>:null}
            {question?<Typography variant={"h6"} marginBottom={"0.5rem"}>Difficulty: {question.difficulty}</Typography>:null}
            <br></br>
            <br></br>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleFind}>Get a question</Button>
            </Box>
            <Select 
                value={langChoice}
                placeholder={langChoice}
                options={languageChoices} 
                onChange={onChangeLangChoice}
            />
            
            <TextArea value={text} onChange={onChangeText} />

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
