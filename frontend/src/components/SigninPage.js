import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {SIGNIN, URL_USER_SVC} from "../configs";
import { STATUS_CODE_CONFLICT ,STATUS_CODE_SUCCESS} from "../constants";
import {Link} from "react-router-dom";

function SigninPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSigninSuccess, setIsSigninSuccess] = useState(false)

    const handleSignin = async () => {
        setIsSigninSuccess(false)
        const res = await axios.post(URL_USER_SVC+SIGNIN, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    setErrorDialog('Incorrect username or password')
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        console.log(res)
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setSuccessDialog('Login is successful!')
            setIsSigninSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Sign In</Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{marginBottom: "2rem"}}
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleSignin}>Submit</Button>
            </Box>


            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} component={Link} to="/signup">Sign Up</Button>
            </Box>

            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isSigninSuccess
                        ? <Button component={Link} to="/dashboard">Done</Button>
                        : <Button onClick={closeDialog}>Done</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SigninPage;
