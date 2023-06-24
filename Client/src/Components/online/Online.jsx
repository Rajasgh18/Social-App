import './online.css'
    ;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Online({ id }) {

    const host = "http://localhost:5000";

    const [user, setUser, mode] = useState("");
    const { profilePicture, name } = user;
    const profilePic = profilePicture ? `/Assets/Posts/${profilePicture}` : "userIcon.webp";
    const [isLoader, setIsLoader] = useState(true);

    //Fetches online friends details.
    useEffect(() => {
        const getFriend = async () => {
            try {
                const response = await axios(`${host}/api/users/${id}`);
                setUser(response.data);
                setIsLoader(false);
            } catch (error) {
                console.log(error);
            }
        }
        getFriend();
    }, [id]);

    return (
        <>
            {!isLoader ? <div className="onFriendContainer">
                <img src={profilePic} alt="" className='onFriendProfile' />
                <span className="activePoint"></span>
                <span className="onFriendUsername">{name}</span>
            </div> : <div className='flex w-full justify-center'><TailSpin height={25} width={25} color={mode === "light" ? "blue" : "white"} /></div>}
        </>
    )
}
