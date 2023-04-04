import './post.css'

import { MoreVert } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';

import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

export default function Post(props) {

    const host = "http://localhost:5000";
    const mainId = localStorage.getItem('userId');

    let { desc, createdAt, img, likes, comment, userId } = props.post;
    let date = new Date(createdAt);
    const [liked, setLiked] = useState(likes.length);
    const photos = require(`../../../public/Assets/Posts/${img}`);

    const [user, setUser] = useState("");

    const profilePic = user.profilePicture ? require(`../../../public/Assets/Posts/${user.profilePicture}`) : "userIcon.webp";
    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;

    //Function for like.
    const handleLiked = async() => {
        try{
            const data = {userId: mainId, _id: props.post._id};
            const res = await axios.put(`${host}/api/posts/like/${mainId}`, data);
            setLiked(res.data ? liked+1 : liked -1);
        } catch(err){
            console.log(err);
        }
    }

    //Fetches users details.
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios(`${host}/api/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [userId]);

    return (
        <div className='postWrapper' style={profileUrlChecker ? { width: "100%" } : {}}>
            <div className='postTop'>
                <div className="postTopLeft">
                    <Link to={`profile/${userId}`}><img src={profilePic} alt="" className='postProfile' /></Link>
                    <span className="postUsername" >{user.username}</span>
                    <span className="postDate" >{format(date)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert className="tripleDots" />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText" >{desc}</span>
                <img src={photos} alt="" className='postImg' />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteIcon className='postLikeIcon' onClick={handleLiked} />
                    <span className='postLikeCounter' >{liked} People liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className='postCommentText' >{comment ? comment : 0} Comments</span>
                </div>
            </div>
        </div>
    )
}
