import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

function SelectDifficultyPage() {

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
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