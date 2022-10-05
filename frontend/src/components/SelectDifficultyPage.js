import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { URL_USER_SVC, LOGOUT, PROFILE } from "../configs";
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
                <Button component={Link} to="/difficulty" state={{diff: 'easy', name: user}}>Easy</Button>
                <Button component={Link} to="/difficulty" state={{diff: 'medium', name: user}}>Medium</Button>
                <Button component={Link} to="/difficulty" state={{diff: 'hard', name: user}}>Hard</Button>
            </Box>
        </Box>
    )
}

export default SelectDifficultyPage;