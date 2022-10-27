import { Routes, Route, Navigate} from "react-router-dom";
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
import Navbar from "./components/Navbar";

function App() {
const [user, setUser] = useState(null)
useEffect(()=>{
    let temp = JSON.parse(localStorage.getItem('user'))
    if (temp?.expiration){
        let now = new Date()
        var UTCdate = new Date(temp.expiration)
        if(UTCdate>now){
            setUser(JSON.parse(localStorage.getItem('user')))
        } else{
            localStorage.setItem('user',null)
            setUser(null)
        }
    } else{
        localStorage.setItem('user',null)
        setUser(null)
    }
},[])

    return (
        <div className="App">
            
            <UserContext.Provider value={{user, setUser}}>
            <Box display={"flex"} flexDirection={"column"} padding={user?"":"4rem"} margin={"10px"}>
                    {user?(<>
                   
                        <Navbar />
                        <Routes>
                        <Route path="/*" element={<Navigate replace to={DASHBOARD} />}></Route>
                        <Route exact path={DASHBOARD} element={<SelectDifficultyPage/>}/>
                        <Route exact path={DIFFICULTY} element={<PendingMatchingPage/>}/>
                        <Route exact path={PROFILE} element={<ProfilePage/>}/>
                        <Route path={QUESTIONS} element={<QuestionsPage/>}/>
                        <Route path="/room/*" element={<Room/>}/>
                        </Routes></>)
                    :
                        (
                        <Routes>
                        <Route exact path="/*" element={<Navigate replace to={SIGNIN} />}></Route>
                        <Route path={SIGNUP} element={<SignupPage/>}/>
                        <Route path={SIGNIN} element={<SigninPage/>}/>
                        </Routes>)
                   
                        }
                        </Box>
                </UserContext.Provider>
            
        </div>
    );
}

export default App;
