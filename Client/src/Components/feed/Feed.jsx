import './Feed.css'

import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VideoCallIcon from '@mui/icons-material/VideoCall';

import Story from '../Story/Story';
import Share from '../share/Share';
import Post from '../post/Post';

import postContext from '../../Context/PostContext/postContext';

import React, { useContext, useEffect } from 'react';
import userContext from '../../Context/UserContext/userContext';
import Loader from '../loader/Loader';

function Feed() {
    const { posts, getTimeline } = useContext(postContext);
    const { mainUser } = useContext(userContext);
    const { followers } = mainUser;

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
        getTimeline();
        // eslint-disable-next-line
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
            {posts.length !== 0 ? posts.map((f) => {
                return <Post key={f._id} post={f} />
            }) : <Loader/> } 
        </div>
    );
}

export default Feed;