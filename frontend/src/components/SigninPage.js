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
import {BrowserRouter as Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from "axios";
import {SIGNUP, SIGNIN, DASHBOARD,  URL_USER_SVC} from "../configs";
import { STATUS_CODE_BAD_REQUEST ,STATUS_CODE_SUCCESS} from "../constants";
import {Link} from "react-router-dom";
import { UserContext } from "../util/userContext";

function SigninPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSigninSuccess, setIsSigninSuccess] = useState(false)
    // eslint-disable-next-line
    const {user,setUser} = useContext(UserContext)

    const handleSignin = async () => {
        setIsSigninSuccess(false)
        const res = await axios.post(URL_USER_SVC+SIGNIN, { username, password },{withCredentials:true,credentials: "include"})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                    setErrorDialog('Incorrect username or password')
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            const accesstoken  = res.data.accesstoken
            var today = new Date();
            today.setHours(today.getHours() + 1);
            localStorage.setItem('user', JSON.stringify({username:username, accesstoken:accesstoken,expiration:today}));
            setUser({username:username, accesstoken:accesstoken})
            return <Navigate to={DASHBOARD} />
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

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
                <Button variant={"outlined"} component={Link} to={SIGNUP}>Sign Up</Button>
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
                        ? <Button component={Link} to={DASHBOARD}>Done</Button>
                        : <Button onClick={closeDialog}>Done</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SigninPage;
