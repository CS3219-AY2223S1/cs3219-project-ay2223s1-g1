import {
    Box,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";

function PendingMatchPage() {
    const location = useLocation()
    const { diff } = location.state
    console.log(diff)
    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Will match you to a user here!</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Chosen Difficulty: {diff}</Typography>
        </Box>
    )
}

export default PendingMatchPage;