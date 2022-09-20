import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {BrowserRouter as Navigate} from "react-router-dom";
import {useContext} from "react";
import {Link} from "react-router-dom";
import { URL_USER_SVC, LOGOUT, PROFILE, DIFFICULTY} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_SUCCESS} from "../constants";
import { UserContext } from "../util/userContext";
import useAxios from "../util/useAxios";

function SelectDifficultyPage() {
    const {user,setUser} = useContext(UserContext)
    const axios = useAxios()
    const handleLogout = async () => {
        const res = await axios.post(URL_USER_SVC+LOGOUT,{withCredentials:true,credentials: "include"})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    console.log("Error during log out")
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setUser(null)
        }
    }
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogout}>Logout</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
            <Button component={Link} to={PROFILE}>Profile</Button>
            </Box>

            <Typography variant={"h3"} marginBottom={"2rem"}>Select Difficulty Level</Typography>

            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'easy'}}>Easy</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'medium'}}>Medium</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'hard'}}>Hard</Button>
            </Box>
        </Box>
    )
}

export default SelectDifficultyPage;