import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

function SelectDifficultyPage() {
    const location = useLocation()
    const { name } = location.state;

    return (
        <Box display={"flex"} flexDirection={"column"} width={"70%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Select Difficulty Level</Typography>

            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'easy', name: name}}>Easy</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'medium', name: name}}>Medium</Button>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                <Button component={Link} to="/difficulty" state={{diff: 'hard', name: name}}>Hard</Button>
            </Box>
        </Box>
    )
}

export default SelectDifficultyPage;