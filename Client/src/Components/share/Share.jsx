import './share.css';

import DuoIcon from '@mui/icons-material/Duo';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import userContext from '../../Context/UserContext/userContext';
import postContext from '../../Context/PostContext/postContext';

import React, { useContext, useRef, useState } from 'react'

export default function Share() {

    const { mainUser } = useContext(userContext);
    const { createPost, uploadPost } = useContext(postContext);

    const { username, profilePicture } = mainUser;

    const [file, setFile] = useState(null)
    const desc = useRef()

    const profilePic = profilePicture ? require(`../../../public/Assets/Posts/${profilePicture}`) : "userIcon.webp";
    const profileUrlChecker = window.location.href.indexOf("profile") !== -1;

    const handleSubmit = async () => {
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
            uploadPost(data);

            //Creates the post and save it in the database
            createPost(newPost.desc, newPost.img);

            window.location('reload');
        }
    }

    return (
        <form className='share' style={profileUrlChecker ? { width: "100%" } : {}} onSubmit={handleSubmit}>
            <div className="shareTop">
                <div className='shareTopItem'><img src={profilePic} alt="" className='shareTopIcon' /></div>
                <input type="text" ref={desc} placeholder={`What's on your mind, ${username}?`} />
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
                <button type='submit' className='shareBtn'>Share</button>
            </div>
        </form>
    )
}
