import './friends.css'

import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import UserContext from '../../Context/UserContext/userContext';

export default function Friends({ user }) {

    const userId = localStorage.getItem("userId");
    const {mode, host, Navigate} = useContext(UserContext);

    const [currUser, setCurrUser] = useState("");
    const { profilePicture, name } = currUser;

    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;
    const messageUrlChecker = window.location.href.indexOf("messages") !== -1;
    const [isLoader, setIsLoader] = useState(true);

    const friendBoxImg = {
        width: "80px",
        height: "80px",
        borderRadius: "8px",
    }

    //Creates a conversation when clicked.
    const handleClick = async () => {
        const data = {
            senderId: userId,
            receiverId: user
        }
        try {
            // eslint-disable-next-line
            const res = await axios.post(`${host}/api/conversation`, data);
        } catch (err) {
            console.log(err);
        }
        Navigate("/messages");
    }

    //Fetches friends details into curruser variable.
    useEffect(() => {
        const getFriend = async () => {
            try {
                const response = await axios(`${host}/api/users/${user}`);
                setCurrUser(response.data);
                setIsLoader(false);
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();
    }, [user]);

    return (
        <>
            {!isLoader ? <div onClick={handleClick} className={`friendContainer ${messageUrlChecker ? "friendContainerMessages clickDisable" : ""} ${profileUrlChecker ? "flex-col w-full h-full hover:bg-transparent" : ""}`} >
                <img src={`/Assets/Posts/${profilePicture ? profilePicture : "userIcon.webp"}`} alt="" style={profileUrlChecker ? friendBoxImg : {}} className={`friendProfile ${messageUrlChecker ? "friendProfileMessages" : ""}`} />
                <div className='friendDetail'>
                    <span className="friendUsername">{name ? name : "none"}</span>
                    {messageUrlChecker && <span className='profileMessages'>Hello!</span>}
                </div>
            </div> : <div className='flex w-full justify-center'><TailSpin height={25} width={25} color={mode === "light" ? "blue" : "white"} /></div>}
        </>
    )
}
