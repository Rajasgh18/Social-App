import './App.css';

import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import Messenger from './Pages/messenger/Messenger';

import userContext from './Context/UserContext/userContext';

import { useContext, useEffect } from 'react';
import {
    Routes,
    Route,
    useNavigate
} from 'react-router-dom';

function App() {

    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');

    const { mode, setMode, getMainUser } = useContext(userContext);

    //Functions for the change in the mode according to the user.
    const setHoverColor = (newColor) => {
        document.documentElement.style.setProperty('--hover-color', newColor);
    }
    const setHoverFeedColor = (newColor) => {
        document.documentElement.style.setProperty('--hover-feed-color', newColor);
    }
    const setTextColor = (newColor) => {
        document.documentElement.style.setProperty('--text-color', newColor);
    }
    const setTextSecondaryColor = (newColor) => {
        document.documentElement.style.setProperty('--text-secondary-color', newColor);
    }
    const setPrimaryBackground = (newColor) => {
        document.documentElement.style.setProperty('--primary-background', newColor);
    }
    const setSecondaryBackground = (newColor) => {
        document.documentElement.style.setProperty('--secondary-background', newColor);
    }
    const setChatMesgBackground = (newColor) => {
        document.documentElement.style.setProperty('--chat-mesg-background', newColor);
    }
    const setSecondaryBoxShadow = (newColor) => {
        document.documentElement.style.setProperty('--secondary-box-shadow', newColor);
    }

    useEffect(() => {
        //Checks whether previously a mode was selected or not if yes it sets it to the previously seleted mode.
        if (localStorage.getItem('userMode'))
            setMode(localStorage.getItem('userMode'));

        //Authenticates whether the user is logined or not if not then it redirects it to login page.
        if (!authToken)
            navigate("/login");
        else {
            //Fetches logedIn users data.
            getMainUser();
        }

        //Changes mode on clicking (Dark or Light mode).
        if (mode === "light") {
            setTextColor("#559");
            setTextSecondaryColor("#77a");

            setHoverColor("#eaeafa");
            setHoverFeedColor("#eaeafa");

            setPrimaryBackground("#fff");
            setSecondaryBackground("#eef");
            setChatMesgBackground("#ededff");
            setSecondaryBoxShadow("#bbd");
        }
        else {
            setTextColor("#ddf");
            setTextSecondaryColor("#ccf");

            setHoverColor("#555577");
            setHoverFeedColor("#555577");

            setPrimaryBackground("#404258");
            setSecondaryBackground("#50577A");
            setChatMesgBackground("#50577A");
            setSecondaryBoxShadow("#48487a");
        }

        // eslint-disable-next-line
    }, [authToken, mode])

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/messages" element={<Messenger />} />
            </Routes>
        </>
    );
}

export default App;