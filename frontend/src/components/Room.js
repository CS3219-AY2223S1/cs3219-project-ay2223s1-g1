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
import { useState } from "react";
import { TextArea } from "@progress/kendo-react-inputs";
import Select from 'react-select';

function Room() {
    const location = useLocation()
    const { name, matchName } = location.state
    const [isLeave, setIsLeave] = useState(false)
    const [matchLeaves, setMatchLeaves] = useState(false)
    const [text, setText] = useState("")
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
    })

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

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>

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
