import './navbar.css'

import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import TelegramIcon from '@mui/icons-material/Telegram';

import userContext from '../../Context/UserContext/userContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

    const { mainUser, mode, setMode } = useContext(userContext);
    const { profilePicture, name } = mainUser;
    const profilePic = profilePicture ? `/Assets/Posts/${profilePicture}` : "/Assets/Posts/userIcon.webp";

    //Logout function which token and userId from the localstorage.
    const handleClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.reload(false);
        // navigate("/login");
    }

    //For profile dialog box appearance and disapearance.
    const handleProfile = () => {
        let container = document.getElementById('profileMenu');
        let element = document.getElementById('hideMe');
        element.style.display = "flex";
        document.addEventListener('mouseup', function (e) {
            if (!container.contains(e.target)) {
                element.style.display = "none";
            }
        });
    }

    const [navBack, setNavBack] = useState({});
    const [navHead, setNavHead] = useState({});
    const [navIcon, setNavIcon] = useState({});

    //Set the Navbar mode.
    const handleMode = () => {
        if (mode === "light") {
            setMode("dark");
            localStorage.setItem('userMode', "dark");
        }
        else {
            setMode("light");
            localStorage.setItem('userMode', "light");
        }
    }

    //Changes Navbars mode.
    useEffect(() => {
        if (mode === "dark") {
            setNavBack({ backgroundColor: "#334", boxShadow: "0 0px 10px 0px var(--secondary-box-shadow)", color: "#ddf" })
            setNavHead({ color: "#ddf" })
            setNavIcon({ backgroundColor: "#404258", color: "#ddf" })
        }
        else {
            setNavBack({ backgroundColor: "#fff", boxShadow: "0px 1px 3px 1px var(--secondary-box-shadow)" })
            setNavHead({ color: "#6161dd" })
            setNavIcon({ backgroundColor: "#eeeef9", color: "#6161dd" })

        }
    }, [mode])

    return (
        <div className='navbar' style={navBack}>
            <div className='logoDiv'>
                <Link className='LogoHead' to="/">
                    <img src='/k.png' alt="" />
                    <h2 style={navHead}>ingbook</h2>
                </Link>
            </div>
            <div className='middleContainer'>
                <SearchIcon className='searchIcon' />
                <input type="text" placeholder='Search Kingbook' />
            </div>
            <div className='rightContainer'>
                <div className='rightContainerItem' style={navIcon} onClick={handleMode} >{mode === "light" ? <DarkModeIcon style={navIcon} className='rightContainerIcon' /> : <LightModeIcon style={navIcon} className='rightContainerIcon' />}</div>
                <Link className='rightContainerItem' to="/messages" style={navIcon}><TelegramIcon style={navIcon} className='rightContainerIcon' /><span>1</span></Link>
                <div className='rightContainerItem' style={navIcon}><NotificationsActiveIcon style={navIcon} className='rightContainerIcon' /><span>1</span></div>
                <div onClick={handleProfile} id="profileMenu" className='rightContainerItem' style={navIcon}>
                    <button ><img className='profileIcon' src={profilePic} alt="" /></button>
                    <div id='hideMe' className='profileContainer'>
                        <div style={navBack} >
                            <li>
                                <img className='profileIcon' alt='' src={profilePic} />
                                <span>{name}</span>
                            </li>
                            <li>
                                <SettingsIcon style={navIcon} className='profileContainerIcon' />
                                <span>Settings</span>
                            </li>
                            <li>
                                <HelpIcon style={navIcon} className='profileContainerIcon' />
                                <span>Help & Support</span>
                            </li>
                            <li>
                                <BedtimeIcon style={navIcon} className='profileContainerIcon' />
                                <span>Display & Accessibility</span>
                            </li>
                            <li>
                                <FeedbackIcon style={navIcon} className='profileContainerIcon' />
                                <span>Give Feedback</span>
                            </li>
                            <li onClick={handleClick}>
                                <LogoutIcon style={navIcon} className='profileContainerIcon' />
                                <span>Logout</span>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Navbar;