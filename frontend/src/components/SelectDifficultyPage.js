
import 'antd/dist/antd.min.css';
import {
    Box,
    Typography,

    
} from "@mui/material";


function SelectDifficultyPage() {




    return (  
        <Box display={"flex"} flexDirection={"column"} width={"70%"} alignSelf={'center'} margin={'50px'}>
            <Typography variant={"h5"} marginBottom={"10px"}>Welcome to Group 1's Peer prep</Typography>
            <Typography variant={"h5"} marginBottom={"10px"}>To Test out matching service, click on Match Tab and select a difficulty</Typography>
            <Typography variant={"h5"} marginBottom={"10px"}>To Test out reset of password, click on Profile Tab and Account Settings</Typography>
            <Typography variant={"h5"} marginBottom={"10px"}>Take note, the Question modification is only allowed for Admins</Typography>
            <Typography variant={"h5"} marginBottom={"10px"}>To Add / Edit / Remove Questions in the question bank, click on the Questions Tab</Typography>
            <Typography variant={"h5"} marginBottom={"10px"}>To Log Out, Click on Profile Tab and Log Out</Typography>
        </Box>
    )
}

export default SelectDifficultyPage;