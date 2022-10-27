import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import { URL_USER_SVC, LOGOUT, DASHBOARD} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_SUCCESS, STATUS_CODE_BAD_REQUEST} from "../constants";
import useAxios from "../util/useAxios";
import { UserContext } from "../util/userContext";

function ProfilePage() {
    const {setUser} = useContext(UserContext)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const axios = useAxios()
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


    const handleUpdate = async () => {
        const res = await axios.put(URL_USER_SVC, {oldPassword, newPassword },{withCredentials:true,credentials: "include"}).catch((err) => {
                if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                    setErrorDialog(err.response.data.message)
                } else {
                    setErrorDialog('Error while changing password')
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setSuccessDialog('Password Successfully changed!')
        }
    }

    const handleDelete = async () => {
        const res = await axios.delete(URL_USER_SVC, {withCredentials:true,credentials: "include"}).catch((err) => {
            if (err.response.status !== STATUS_CODE_SUCCESS) {
                console.log('Error while deleting user account')
            }
        })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setUser(null)
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleDelete}>Delete Account</Button>
            </Box>
            <TextField
                label="Old Password"
                variant="standard"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="New Password"
                variant="standard"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <TextField
                label="Repeat New Password"
                variant="standard"
                type="password"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                sx={{marginBottom: "1rem"}}
                autoFocus
            />
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleUpdate}>Submit</Button>
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
                    <Button onClick={closeDialog}>Done</Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default ProfilePage;