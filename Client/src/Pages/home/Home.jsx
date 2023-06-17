import './Home.css'

import Navbar from '../../Components/navbar/Navbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import Feed from '../../Components/feed/Feed';
import Rightbar from '../../Components/rightbar/Righbar';

import { io } from "socket.io-client";

import userContext from '../../Context/UserContext/userContext';
import React, { useContext, useEffect, useRef } from 'react';

function Home() {

    const { user, post } = useContext(userContext);

    const userId = localStorage.getItem('userId');
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
    }, [])

    //Sending userId to socket for connecting to socket and showing online status to other users
    useEffect(() => {
        socket?.current.emit("addUser", userId);
    }, [socket, userId])

    return (
        <>
            <Navbar />
            <div className='homeContainer'>
                <Sidebar />
                <Feed post={post} user={user} />
                <Rightbar user={user} />
            </div>
        </>
    );
}
export default Home;