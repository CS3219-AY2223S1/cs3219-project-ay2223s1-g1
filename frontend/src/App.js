import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import ProfilePage from './components/ProfilePage';
import SelectDifficultyPage from './components/SelectDifficultyPage';
import PendingMatchingPage from './components/PendingMatchingPage';
import Room from './components/Room';
import {Box} from "@mui/material";
import {useState, useEffect} from "react";
import { UserContext } from "./util/userContext";
import {SIGNUP, SIGNIN, DASHBOARD, DIFFICULTY, PROFILE, QUESTIONS} from "./configs";
import QuestionsPage from "./components/questionsPage";

function App() {
const [user, setUser] = useState(null)
useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
},[])

    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <UserContext.Provider value={{user, setUser}}>
                        {user?
                        <Routes>
                        <Route exact path="/*" element={<Navigate replace to={DASHBOARD} />}></Route>
                        <Route path={DASHBOARD} element={<SelectDifficultyPage/>}/>
                        <Route path={DIFFICULTY} element={<PendingMatchingPage/>}/>
                        <Route path={PROFILE} element={<ProfilePage/>}/>
                        <Route path={QUESTIONS} element={<QuestionsPage/>}/>
                        <Route path="/room/*" element={<Room/>}/>
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
