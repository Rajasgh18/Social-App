import './online.css'
    ;
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Online(props) {

    const host = "http://localhost:5000";

    const [user, setUser] = useState("");
    const { profilePicture, username } = user;
    const profilePic = profilePicture ? require(`../../../public/Assets/Posts/${profilePicture}`) : "userIcon.webp";

    //Fetches online friends details.
    useEffect(() => {
        const getFriend = async () => {
            try {
                const response = await axios(`${host}/api/users/${props.user}`);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();
    }, [props.user]);

    return (
        <div>
            <div className="onFriendContainer">
                <img src={profilePic} alt="" className='onFriendProfile' />
                <span className="activePoint"></span>
                <span className="onFriendUsername">{username}</span>
            </div>
        </div>
    )
}
