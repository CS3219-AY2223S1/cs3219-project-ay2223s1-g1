import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";

import {useEffect, useState} from "react";
import { URL_QUESTION_SVC} from "../configs";
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_CREATED, STATUS_CODE_SUCCESS} from "../constants";
import useAxios from "../util/useAxios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function QuestionsPage() {
    const [title, setTitle] = useState("")
    const [question, setQuestion] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [allquestions, setAllquestions] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [deleteId, setdeleteId] = useState("")
    const [specificDifficulty, setspecificDifficulty] = useState("")
    const [specificData,setspecificData] = useState()
    const axios = useAxios()
    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setTitle("")
        setQuestion("")
        setDifficulty("")
        setdeleteId("")
        setDialogTitle('Success')
        setDialogMsg(msg)
    }
    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    const handleAddition = async () => {
        const res = await axios.post(URL_QUESTION_SVC, {title, question, difficulty},{withCredentials:true,credentials: "include"}).catch((err) => {
                if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                    setErrorDialog(err.response.data.message)
                } else {
                    setErrorDialog('Error while creating question')
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Question Successfully created!')
            getAllQuestions()
        }
    }

    const handleDelete = async () => {
        const res = await axios.delete(URL_QUESTION_SVC+`/${deleteId}`,{withCredentials:true,credentials: "include"}).catch((err) => {
            if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                setErrorDialog(err.response.data.message)
            } else {
                setErrorDialog('Error while deleting question')
            }
        })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setSuccessDialog('Question Successfully deleted!')
            getAllQuestions()
        }
        
    }

    const handleFind = async () => {
        const res = await axios.get(URL_QUESTION_SVC+`/${specificDifficulty}`,{withCredentials:true,credentials: "include"}).catch((err) => {
            if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                console.log(err.response.data.message)
            }
        })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setspecificData(res.data[0])
        }
    }

    const getAllQuestions = async () => {
        const res = await axios.get(URL_QUESTION_SVC,{withCredentials:true,credentials: "include"}).catch((err) => {
            if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                console.log(err.response.data.message)
            }
        })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setAllquestions(res.data)
        }
    }
    useEffect(()=>{
        getAllQuestions()
        // eslint-disable-next-line
    },[])

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"} alignSelf={'center'}>
            <Typography variant={"h5"} marginBottom={"10px"}>Add a new question: (For admins only) </Typography>
            <TextField
                label="Question Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Question"
                variant="standard"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Difficulty"
                variant="standard"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleAddition}>Add</Button>
            </Box>
            <br></br>
            <Typography variant={"h5"} marginBottom={"10px"}>Delete a question: (For admins only) </Typography>
            <TextField
                label="Id"
                variant="standard"
                value={deleteId}
                onChange={(e) => setdeleteId(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleDelete}>Delete</Button>
            </Box>
            <Typography variant={"h5"} marginBottom={"10px"}>Select a question at random based on difficulty</Typography>
            <TextField
                label="Difficulty"
                variant="standard"
                value={specificDifficulty}
                onChange={(e) => setspecificDifficulty(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleFind}>Find</Button>
            </Box>
            <br></br>
            {specificData?"index: "+ specificData.index:null}
            <br></br>
            {specificData?"Title: "+specificData.title:null}
            <br></br>
            {specificData?"Question: "+specificData.question:null}
            <br></br>
            {specificData?"Difficulty: "+specificData.difficulty:null}
            <br></br>
            <br></br>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Done</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right" width="10">ID</TableCell>
            <TableCell align="right" width="10">Index</TableCell>
            <TableCell align="right"width="10">Title</TableCell>
            <TableCell align="right"width="10">Difficulty</TableCell>
            <TableCell align="right" width="300">Question</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allquestions.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right">{row._id}</TableCell>
              <TableCell align="right">{row.index}</TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.difficulty}</TableCell>
              <TableCell align="right">{row.question}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}

export default QuestionsPage;