import React from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Home from 'routes/Home';
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {/* navigation이 존재하려면 isLoggedIn이 true여야함 */}
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                    {/* 로그인이 되어 있으면 */}
                    <Route 
                        path="/" 
                        element={<Home userObj={userObj}/>}>
                    </Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </>
                :
                <>
                    {/* 로그인이 되어있지 않다면 */}
                    <Route path="/" element={<Auth />}></Route>
                    <Route path="*" element={<Navigate replace to="/" />}></Route>
                </>
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;