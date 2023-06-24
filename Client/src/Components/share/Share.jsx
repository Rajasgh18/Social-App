import './share.css';

import DuoIcon from '@mui/icons-material/Duo';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import userContext from '../../Context/UserContext/userContext';
import postContext from '../../Context/PostContext/postContext';

import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';

export default function Share() {

    const { mainUser, host } = useContext(userContext);
    const { setPosts } = useContext(postContext);
    const userId = localStorage.getItem('userId');


    const { name, profilePicture } = mainUser;

    const [file, setFile] = useState(null)
    const desc = useRef()

    const profilePic = profilePicture ? `/Assets/Posts/${profilePicture}` : "/Assets/Posts/userIcon.webp";
    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Store the description and userId.
        const newPost = {
            userId: mainUser.id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;

            data.append("name", filename);
            data.append("file", file);

            newPost.img = filename;

            //Uploads the photo and stores it in the location specified in the backend.
            try {
                let res = await axios.post("http://localhost:5000/api/posts/upload", data);
                console.log(res.data)
                //Creates the post and save it in the database
                res = await axios.post(`${host}/api/posts`, { userId, desc: newPost.desc, img: newPost.img })
                setPosts(prev => [...prev, res.data])
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <form className='share hidden feedAnim' style={profileUrlChecker ? { width: "100%", '--i': 200 } : { '--i': 200 }} onSubmit={handleSubmit}>
            <div className="shareTop">
                <div className='shareTopItem'><img src={profilePic} alt="" className='shareTopIcon' /></div>
                <input type="text" ref={desc} placeholder={`What's on your mind, ${name}?`} />
            </div>
            <div className="shareBottom">
                <div className="shareBottomItems">
                    <DuoIcon className='shareBottomIcon duoIcon' />
                    <span>Live Video</span>
                </div>
                <label htmlFor='file' className="shareBottomItems">
                    <PhotoLibraryIcon className='shareBottomIcon photoIcon' />
                    <span>Photos/Video</span>
                </label>
                <input style={{ display: "none" }} type="file" accept='.jpg, .jpeg' id='file' onChange={(e) => setFile(e.target.files[0])} />
                <div className="shareBottomItems">
                    <EmojiEmotionsIcon className='shareBottomIcon emojiIcon' />
                    <span>Feeling/Activity</span>
                </div>
                <button type='submit' className='shareBtn bg-green-500'>Share</button>
            </div>
        </form>
    )
}
