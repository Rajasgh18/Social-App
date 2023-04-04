import './Sidebar.css'

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StoreIcon from '@mui/icons-material/Store';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AddBoxIcon from '@mui/icons-material/AddBox';

import React, { useContext } from 'react';
import userContext from '../../Context/UserContext/userContext';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();

    const { mainUser } = useContext(userContext)
    const { username, profilePicture } = mainUser;

    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;
    const messageUrlChecker = window.location.href.indexOf("messages") !== -1;
    const profilePic = profilePicture ? require(`../../../public/Assets/Posts/${profilePicture}`) : "userIcon.webp";

    //Takes to home page.
    const handleHome = (e) => {
        navigate('/');
        const activeBox = document.getElementById('activeDisplayer');
        const sideBarBtns = document.getElementsByClassName('sideWrapperItems');
        const arr = [...sideBarBtns];
        arr.forEach(container => {
            if (!container.contains(activeBox)) {
                container.appendChild(activeBox);
            }
        })
    }

    const handleClick = (e) => {
        const activeBox = document.getElementById('activeDisplayer');
        const sideBarBtns = document.getElementsByClassName('sideWrapperItems');
        const arr = [...sideBarBtns];
        arr.forEach(container => {
            if (container.id === e.target.id) {
                container.appendChild(activeBox);
            }
        })
    }

    //Takes to profile page.
    const handleProfile = (e) => {
        navigate(`/profile/${userId}`);
        const activeBox = document.getElementById('activeDisplayer');
        const sideBarBtns = document.getElementsByClassName('sideWrapperItems');
        const arr = [...sideBarBtns];
        arr.forEach(container => {
            if (container.id === e.target.id) {
                container.appendChild(activeBox);
            }
        })
    }

    return (
        <div className={` sidebar ${profileUrlChecker ? "sideBarProfile" : ""} ${messageUrlChecker ? "sideBarMessages" : ""}`}>
            <div className="sideWrapper" style={profileUrlChecker ? { overflowY: "visible" } : {}}>
                <ul>
                    <li id='Home' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}} onClick={handleHome}>
                        <span id='activeDisplayer'></span>
                        <HomeIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Home</span>
                    </li>
                    <li id='Profile' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}} onClick={handleProfile}>
                        <img src={profilePic} alt="" className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >{username}</span>
                    </li>
                    <hr className='sideWrapperLine' style={profileUrlChecker ? { margin: "10px 0px 10px 20px" } : {}} />
                    <li onClick={handleClick} id='Friends' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <GroupIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Friends</span>
                    </li>
                    <li onClick={handleClick} id='Most recent' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <EventNoteIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Most recent</span>
                    </li>
                    <li onClick={handleClick} id='Groups' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <GroupsIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Groups</span>
                    </li>
                    <li onClick={handleClick} id='Marketplace' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <StoreIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Marketplace</span>
                    </li>
                    <li onClick={handleClick} id='Watch' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <OndemandVideoIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Watch</span>
                    </li>
                    <li onClick={handleClick} id='See all' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <DashboardCustomizeIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >See all</span>
                    </li>
                    <hr className='sideWrapperLine' style={profileUrlChecker ? { margin: "10px 0 10px 20px" } : {}} />
                    <li onClick={handleClick} id='Games' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        <AddBoxIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Games</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;