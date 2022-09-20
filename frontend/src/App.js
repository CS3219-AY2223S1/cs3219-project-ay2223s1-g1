import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import ProfilePage from './components/ProfilePage';
import SelectDifficultyPage from './components/SelectDifficultyPage';
import PendingMatchingPage from './components/PendingMatchingPage';
import {Box} from "@mui/material";
import {useState} from "react";
import { UserContext } from "./util/userContext";
import {SIGNUP, SIGNIN, DASHBOARD, DIFFICULTY, PROFILE} from "./configs";

function App() {
const [user, setUser] = useState(null)
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <UserContext.Provider value={{user,setUser}}>
                        {user?
                        <Routes>
                        <Route exact path="/*" element={<Navigate replace to={DASHBOARD} />}></Route>
                        <Route path={DASHBOARD} element={<SelectDifficultyPage/>}/>
                        <Route path={DIFFICULTY} element={<PendingMatchingPage/>}/>
                        <Route path={PROFILE} element={<ProfilePage/>}/>
                        </Routes>:
                        <Routes>
                        <Route exact path="/*" element={<Navigate replace to={SIGNIN} />}></Route>
                        <Route path={SIGNUP} element={<SignupPage/>}/>
                        <Route path={SIGNIN} element={<SigninPage/>}/>
                        </Routes>
                        }
                    </UserContext.Provider>
                </Router>
            </Box>
        </div>
    );
}

export default App;
