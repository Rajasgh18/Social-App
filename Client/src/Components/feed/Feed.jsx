import './Feed.css'

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import Story from '../Story/Story';
import Share from '../share/Share';
import Post from '../post/Post';

import postContext from '../../Context/PostContext/postContext';

import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../Context/UserContext/userContext';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

function Feed() {
    const { posts, setPosts, getTimeline } = useContext(postContext);
    const { mainUser, mode, host } = useContext(userContext);
    const { followers } = mainUser;
    const [isLoader, setIsLoader] = useState(true);
    const userId = localStorage.getItem('userId');

    //Sorts the message according to time.
    for (let i = 0; i < posts.length - 1; i++) {
        for (let j = 0; j < posts.length - 1; j++) {
            if (posts[j].createdAt < posts[j + 1].createdAt) {
                let temp = posts[j];
                posts[j] = posts[j + 1];
                posts[j + 1] = temp;
            }
        }
    }

    //Function for appear and disappear of line below buttons(Story, Reels, Room).
    const handleClick = (e) => {
        let element = document.querySelectorAll(`.feedUpper button`);
        const activeLine = document.querySelector('.feedUpperActive');
        let arr = [...element];
        arr.forEach(btn => {
            if (e.target === btn) {
                btn.appendChild(activeLine);
                btn.addEventListener("mouseover", () => { btn.style.backgroundColor = "transparent" });
                btn.style.cursor = "default";
            }
            else {
                btn.addEventListener("mouseover", () => { btn.style.backgroundColor = "var(--hover-feed-color)" });
                btn.addEventListener("mouseout", () => { btn.style.backgroundColor = "transparent" });
                btn.style.cursor = "pointer";

            }
        })
    }

    //Fetches all the post of friends.
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${host}/api/posts/timeline/${userId}`);
                setPosts(res.data);
                setIsLoader(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <div className='feedUpper'>
                    <button className='story' onClick={handleClick}><ImportContactsIcon className='feedWrapperIcon' /><span >Story</span><hr className='feedUpperActive' /></button>
                    <button className='reels' onClick={handleClick}><LiveTvIcon className='feedWrapperIcon' /><span >Reels</span></button>
                    <button className='room' onClick={handleClick}><VideoCallIcon className='feedWrapperIcon' /><span >Room</span></button>
                </div>
                <hr className="feedWrapperLine" />
                <div className='feedLower'>
                    <Story />
                    <Story />
                </div>
            </div>
            <Share />
            {!isLoader ? posts.length !== 0 ? posts.map((f) => {
                return <Post key={f._id} post={f} />
            }) : <div className={`my-4 text-lg ${mode === "light" ? "text-slate-700" : "text-white"}`}>No Posts Available</div> : <div className='h-full w-full flex justify-center my-10'><TailSpin color={mode === "light" ? "blue" : "white"} width={60} height={60} /></div>}
        </div>
    );
}

export default Feed;