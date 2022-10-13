import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { URL_USER_SVC, LOGOUT, PROFILE, DIFFICULTY, QUESTIONS } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_SUCCESS } from "../constants";
import { UserContext } from "../util/userContext";
import useAxios from "../util/useAxios";

function SelectDifficultyPage() {
    // eslint-disable-next-line
    const {user, setUser} = useContext(UserContext)
    const axios = useAxios()
    const handleLogout = async () => {
        const res = await axios.post(URL_USER_SVC + LOGOUT, {withCredentials:true, credentials: "include"})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    console.log("Error during log out")
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            localStorage.setItem("user",null)
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

            

            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
                <Typography variant={"h5"} marginBottom={"10px"}>Select Difficulty Level : </Typography>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'easy', name: user}}>Easy</Button>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'medium', name: user}}>Medium</Button>
                <Button component={Link} to={DIFFICULTY} state={{diff: 'hard', name: user}}>Hard</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
                <Typography variant={"h5"} marginBottom={"10px"}>For question service:</Typography>
                <Button component={Link} to={QUESTIONS}>View all available questions</Button>
            </Box>
        </Box>
    )
}

export default SelectDifficultyPage;