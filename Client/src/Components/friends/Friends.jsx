import './friends.css'

import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Friends({ user }) {

    const host = "http://localhost:5000";
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [currUser, setCurrUser] = useState("");
    const { profilePicture, username } = currUser;

    const profilePic = `/Assets/Posts/${profilePicture ? profilePicture : "userIcon.webp"}`;

    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;
    const messageUrlChecker = window.location.href.indexOf("messages") !== -1;

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
        navigate("/messages");
    }

    //Fetches friends details into curruser variable.
    useEffect(() => {
        const getFriend = async () => {
            try {
                const response = await axios(`${host}/api/users/${user}`);
                setCurrUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();
    }, [user]);

    return (
        <>
            <div onClick={handleClick} className={`friendContainer ${messageUrlChecker ? "friendContainerMessages clickDisable" : ""}`} style={profileUrlChecker ? { flexDirection: "column" } : {}} >
                <img src={profilePic} alt="" style={profileUrlChecker ? friendBoxImg : {}} className={`friendProfile ${messageUrlChecker ? "friendProfileMessages" : ""}`} />
                <div className='friendDetail'>
                    <span className="friendUsername">{username ? username : "none"}</span>
                    {messageUrlChecker && <span className='profileMessages'>Hello!</span>}
                </div>
            </div>
        </>
    )
}
