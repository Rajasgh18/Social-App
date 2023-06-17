import './App.css';

import Home from './Pages/home/Home';
import Profile from './Pages/profile/Profile';
import Login from './Pages/login/Login';
import Signup from './Pages/signup/Signup';
import Messenger from './Pages/messenger/Messenger';

import userContext from './Context/UserContext/userContext';

import { useContext, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import PageOnProgress from './Pages/PageOnProgress';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

const App = () => {

  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [isLoader, setIsLoader] = useState(true);
  const location = useLocation().pathname;
  const { mode, setMode, setMainUser, host } = useContext(userContext);

  useEffect(()=>{
    (location === '/login' || location === '/signup') && setIsLoader(false);
  }, [location])

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
      const fetchMainUser = async () => {
        try {
          const res = await axios.get(`${host}/api/users/${userId}`);
          setMainUser(res.data);
          setIsLoader(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchMainUser()
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
      {!isLoader ? <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/messages" element={<Messenger />} />
        <Route path='*' element={<PageOnProgress />} />
      </Routes> : <div className='w-full min-h-screen flex justify-center items-center'><TailSpin height={60} width={60} color={mode === "light" ? "blue" : "white"} /></div>}
    </>
  );
}

export default App
