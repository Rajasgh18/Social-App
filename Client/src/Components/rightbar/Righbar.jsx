import './Rightbar.css'

import Friends from '../friends/Friends';
import Online from '../online/Online';

import userContext from '../../Context/UserContext/userContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { TailSpin } from 'react-loader-spinner';

function Rightbar() {

    const userId = localStorage.getItem('userId');
    const { mainUser, mode } = useContext(userContext);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const { followers } = mainUser;


    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getUsers", users => {
            users.filter(e => e.userId !== userId);
            setOnlineFriends(users.filter(e => e.userId !== userId));
        })
    }, [])


    return (
        <div className='rightbar'>
            <div className={`rightbarWrapper ${mode === "dark" ? "rightbarWrapperDark" : ""}`}>
                <div className="rightbarTop">
                    <h2 className='rightbarHeadings'>Your Friends</h2>
                    {followers.length !== 0 ? followers.map((f) => {
                        return <Friends key={f} user={f} />;
                    }) : <span className='inactive'>No friends yet!</span>}
                    <div className="rightbarBottom">
                        <h2 className="rightbarHeadings">Active Friends</h2>
                        {onlineFriends.length !== 0 ? onlineFriends.map((f) => {
                            return <Online key={f} id={f.userId} />;
                        }) : <span className='inactive'>No friends are active</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rightbar;