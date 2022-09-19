import {
    Box,
    Button,
    TextField,
} from "@mui/material";

import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC, LOGOUT, DASHBOARD} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_SUCCESS} from "../constants";
import { UserContext } from "../util/userContext";

function ProfilePage() {
    const {user,setUser} = useContext(UserContext)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
    const handleLogout = async () => {
        const accesstoken = user.accesstoken
        const res = await axios.post(URL_USER_SVC+LOGOUT,{withCredentials:true,credentials: "include"},{headers: {
            Authorization: 'Bearer ' + accesstoken
        }})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    console.log("Error during log out")
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setUser(null)
        }
    }
    const handleUpdate = async () => {
        const accesstoken = user.accesstoken
        axios.interceptors.request.use(
            config => {
              config.headers['Authorization'] = `Bearer ${accesstoken}`;
                  return config;
              },
              error => {
                  return Promise.reject(error);
              }
          );
        const res = await axios.put(URL_USER_SVC, {oldPassword, newPassword },{withCredentials:true,credentials: "include"}).catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    console.log('Incorrect username or password')
                } else {
                    console.log('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            const accesstoken  = res.data.accesstoken
        }
    }
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogout}>Logout</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
            <Button component={Link} to={DASHBOARD}>Back</Button>
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

        </Box>
    )
}

export default ProfilePage;