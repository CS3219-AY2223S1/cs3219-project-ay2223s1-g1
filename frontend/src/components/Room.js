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
import { languageOptions } from "./Editor/constants/languageOptions";
import LanguagesDropdown from "./Editor/LanguagesDropdown";
import CodeEditorWindow from "./Editor/CodeEditorWindow";
import ThemeDropdown from "./Editor/ThemeDropdown";
import { useLocation, Navigate, Link } from "react-router-dom";
import { io } from "socket.io-client";

import { defineTheme } from "./Editor/lib/defineTheme";
import {useState, useEffect} from "react";
import { TextArea } from "@progress/kendo-react-inputs";
import Select from 'react-select';
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_SUCCESS} from "../constants";
import {URL_QUESTION_SVC} from "../configs";
import useAxios from "../util/useAxios";
import { MessageFilled } from '@ant-design/icons';

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;
function Room() {
    const location = useLocation()
    const axios = useAxios()
    const { name, matchName , diff} = location.state
    const [isLeave, setIsLeave] = useState(false)
    const [matchLeaves, setMatchLeaves] = useState(false)
    const [string, setString] = useState("")
    const [messages, setMessage] = useState([])
    const [checked, setChecked] = useState(false);
    const [text, setText] = useState("")
    const [question,setQuestion]= useState("")
    const [langChoice, setLangChoice] = useState(languageOptions[0])


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
        setString("");
    }

    
    const handleLeave = async() => {
        socket.emit("leave", name, matchName);
        setIsLeave(true);
    }
    

    const onChangeLangChoice = (newLangChoice) => {
        setLangChoice(newLangChoice);
        socket.emit("update_match_lang_choice", matchName, newLangChoice);
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

    const [code, setCode] = useState(javascriptDefault);
    const [theme, setTheme] = useState("cobalt");



    const onChange = (action, data) => {
      switch (action) {
        case "code": {
          setCode(data);
          break;
        }
        default: {
          console.warn("case not handled!", action, data);
        }
      }
    };
  
    function handleThemeChange(th) {
      const theme = th;
      console.log("theme...", theme);
  
      if (["light", "vs-dark"].includes(theme.value)) {
        setTheme(theme);
      } else {
        defineTheme(theme.value).then((_) => setTheme(theme));
      }
    }
    useEffect(() => {
      defineTheme("oceanic-next").then((_) =>
        setTheme({ value: "oceanic-next", label: "Oceanic Next" })
      );
    }, []);
  

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"} alignSelf={'center'}>
            <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                <Box width={"50%"}>
                    <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
                    <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>
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

            <div
            style={{
                position: 'fixed',
        bottom: '90px',
        right: '24px',
        // Size
        width: '420px',
        height: '530px',
        maxWidth: 'calc(100% - 48px)',
        maxHeight: 'calc(100% - 48px)',
        backgroundColor: 'white',
        // Border
        borderRadius: '12px',
        border: `2px solid #1a34e2`,
        // Shadow
        boxShadow: '0px 0px 16px 6px rgba(0, 0, 0, 0.33)',
               opacity:checked?'1':'0' 
            }}>
                <div style={{overflowY:"scroll",height:"90%"}}>
            <Box component="div" flex={1} flexDirection="column" display="flex" p={1} width={'100%'} height={'100%'}>
                {messages.map((value) => {
                const boolean = value[0];
                const mess = value[1];
                if (boolean) {
                    return <div style={{flexDirection:'column'}}>
                        <div style={{marginLeft:'10px', fontSize:'10px'}}>
                        {matchName}
                        </div>
                        <div style={{border: '0.5px solid #8e8e93',
                    width:'40%',
                    borderRadius: '10px',
                    background: '#8e8e93',

                    maxWidth:'70%',
                    padding: '10px',
                    display: 'inline-block'}}>
                        <div>{mess}</div>
                    </div>
                    </div>
      
                } else {
                    return <div style={{flexDirection:'column', textAlign:'end'}}>
                    <div style={{marginRight:'10px', fontSize:'10px'}}>
                    {name}
                        </div><div style={{border: '0.5px solid #1982FC',
                    width:'40%',
                    borderRadius: '10px',
                    background: '#1982FC',
                    maxWidth:'70%',
                    padding: '10px',
                    display: 'inline-block'}}>
                        <div>{mess}</div>
                    </div>
                    </div>
                }   
            })}
            </Box>
            
        </div>
        <div style={{width:'100%'}}>
        <TextField
                    label="Message"
                    variant="outlined"
                    value={string}
                    onChange={(e) => setString(e.target.value)}
                    sx={{marginBottom: "1rem",width:'80%', borderRadius:'50px'}}
                    inputProps={{
                        style: { height:'15px' },
                      }}
                    />
                    <Button onClick={sendMessage}>Send</Button>

        </div>
        
        </div>
            <div>
            <Button onClick={()=>setChecked(!checked)} style={{ fontSize: '50px', color: '#08c' ,position:'absolute', right:'10px', bottom:'10px'}}>
            <MessageFilled />
            </Button>
            </div>
            <>
            <div className="flex flex-row">
                <div className="px-4 py-2">
                <LanguagesDropdown onSelectChange={onChangeLangChoice} value={langChoice} />
                </div>
                <div className="px-4 py-2">
                <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                <CodeEditorWindow
                    code={code}
                    onChange={onChange}
                    language={langChoice?.value}
                    theme={theme.value}
                />
                </div>
            </div>
            </>
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
