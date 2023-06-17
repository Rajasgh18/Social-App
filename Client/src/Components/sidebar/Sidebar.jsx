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
import { useLocation, useNavigate } from 'react-router-dom';

function Sidebar() {

    const userId = localStorage.getItem('userId')
    const Navigate = useNavigate();

    const { mainUser } = useContext(userContext)
    const { name, profilePicture } = mainUser;
    const location = useLocation().pathname;
    const profileUrlChecker = useLocation().pathname.includes('/profile');
    const messageUrlChecker = useLocation().pathname.includes('/messages');
    const profilePic = profilePicture ? `/Assets/Posts/${profilePicture}` : "/Assets/Posts/userIcon.webp";

    //Takes to home page.
    const handleNavigation = (e)=>{
        e.target.id === "profile" ? Navigate(`/profile/${userId}`) : Navigate(`/${e.target.id}`)
    }

    return (
        <div className={` sidebar ${profileUrlChecker ? "sideBarProfile" : ""} ${messageUrlChecker ? "sideBarMessages" : ""}`}>
            <div className="sideWrapper" style={profileUrlChecker ? { overflowY: "visible" } : {}}>
                <ul>
                    <li id='' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}} onClick={handleNavigation}>
                        {location === '/' && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <HomeIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Home</span>
                    </li>
                    <li id='profile' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}} onClick={handleNavigation}>
                    {location.includes('/profile') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <img src={profilePic} alt="" className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >{name}</span>
                    </li>
                    <hr className='sideWrapperLine' style={profileUrlChecker ? { margin: "10px 0px 10px 20px" } : {}} />
                    <li onClick={handleNavigation} id='friends' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/friends') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <GroupIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Friends</span>
                    </li>
                    <li onClick={handleNavigation} id='most-recent' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/most-recent') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <EventNoteIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Most recent</span>
                    </li>
                    <li onClick={handleNavigation} id='groups' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/groups') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <GroupsIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Groups</span>
                    </li>
                    <li onClick={handleNavigation} id='marketplace' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/marketplace') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <StoreIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Marketplace</span>
                    </li>
                    <li onClick={handleNavigation} id='watch' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/watch') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <OndemandVideoIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Watch</span>
                    </li>
                    <li onClick={handleNavigation} id='see-all' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/see-all') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <DashboardCustomizeIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >See all</span>
                    </li>
                    <hr className='sideWrapperLine' style={profileUrlChecker ? { margin: "10px 0 10px 20px" } : {}} />
                    <li onClick={handleNavigation} id='games' className="sideWrapperItems" style={profileUrlChecker ? { borderRadius: "8px" } : {}}>
                        {location.includes('/games') && <span className='absolute bg-[#6161dd] -left-4 w-3 rounded-tr-md rounded-br-md h-12 mb-1'></span>}
                        <AddBoxIcon className='sideWrapperIcon' />
                        <span className={profileUrlChecker ? 'displayText' : ""}  >Games</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;