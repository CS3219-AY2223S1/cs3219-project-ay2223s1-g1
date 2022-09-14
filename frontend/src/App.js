import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import SelectDifficultyPage from './components/SelectDifficultyPage';
import PendingMatchingPage from './components/PendingMatchingPage';
import AccountDetailsPage from './components/AccountDetailsPage';
import {Box} from "@mui/material";

function App() {
    
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/signup" />}></Route>
                        <Route path="/account" element={<AccountDetailsPage/>}/>
                        <Route path="/dashboard" element={<SelectDifficultyPage/>}/>
                        <Route path="/difficulty" element={<PendingMatchingPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/signin" element={<SigninPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;
