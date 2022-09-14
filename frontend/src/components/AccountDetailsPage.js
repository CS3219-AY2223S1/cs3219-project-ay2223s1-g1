import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography
} from "@mui/material";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_OK, STATUS_CODE_BAD_REQUEST} from "../constants";
import {useState} from "react";
import { Link } from "react-router-dom";

function AccountDetailsPage() {
    const dummy_username = 'dummy_username'
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isAccountDeleteSuccess, setAccountDeleteSuccess] = useState(false)

    const handleDeleteAccount = async () => {
        const res = await axios.delete(URL_USER_SVC + '/delete_account', { dummy_username })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                    setErrorDialog('Invalid username for account deletion')
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_OK) {
            setSuccessDialog('Account successfully deleted')
            setAccountDeleteSuccess(true)
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
        <Box>
            <Box display={"flex"} flexDirection={"column"} width={"70%"}>
                <Typography variant={"h3"} marginBottom={"2rem"}>Here are your account details</Typography>
                <Typography variant={"h3"} marginBottom={"2rem"}>Username - {dummy_username}</Typography>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                    <Button variant={"outlined"} onClick={handleDeleteAccount}>Delete Account</Button>
                </Box>
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
                    {isAccountDeleteSuccess
                        ? <Button component={Link} to="/signup">Sign Up</Button>
                        : <Button onClick={closeDialog}>Done</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AccountDetailsPage;