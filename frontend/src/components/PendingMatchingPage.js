import {
    Box,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";

function PendingMatchPage() {
    const location = useLocation()
    const { diff } = location.state

    // Call to backend with difficulty level to match users
    // Front end to display relevant message and wait for 30 seconds or a match
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Will match you to a user here!</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Chosen Difficulty: {diff}</Typography>
        </Box>
    )
}

export default PendingMatchPage;