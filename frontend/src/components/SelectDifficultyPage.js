import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC, LOGOUT} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import { UserContext } from "../util/userContext";

function SelectDifficultyPage() {
    const {user,setUser} = useContext(UserContext)
    const handleLogout = async () => {
        console.log(user)
        // const res = await axios.post(URL_USER_SVC+LOGOUT)
        //     .catch((err) => {
        //         if (err.response.status === STATUS_CODE_CONFLICT) {
        //             console.log("Error during log out")
        //         }
        //     })
        // if (res && res.status === STATUS_CODE_CREATED) {
        //     console.log("logout successful")
        // }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button variant={"outlined"} onClick={handleLogout}>Logout</Button>
            </Box>

            <Typography variant={"h3"} marginBottom={"2rem"}>Select Difficulty Level</Typography>

            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'easy'}}>Easy</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'medium'}}>Medium</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'hard'}}>Hard</Button>
            </Box>
        </Box>
    )
}

export default SelectDifficultyPage;