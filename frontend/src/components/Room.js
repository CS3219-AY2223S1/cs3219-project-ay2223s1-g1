import {
    Box,
    Typography
} from "@mui/material";
import { useLocation, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

function Room() {
    const location = useLocation()
    const { name, matchName } = location.state

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h5"} marginBottom={"2rem"}>User name: {name}</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>Match name: {matchName}</Typography>
        </Box>
    )
}

export default Room;


