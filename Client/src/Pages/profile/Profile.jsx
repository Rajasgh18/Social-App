import './profile.css';

import Navbar from '../../Components/navbar/Navbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import ProfileImages from '../../Components/profileImages/ProfileImages';
import ProfileInfo from '../../Components/profileInfo/ProfileInfo'

import userContext from '../../Context/UserContext/userContext';
import { useContext, useEffect } from 'react';

export default function Profile() {

    const { mainUser, getUser } = useContext(userContext);
    const { followers } = mainUser;

    //Fetches all the friends and displays it in the profile page
    useEffect(() => {
        for (let i = 0; i < followers.length; i++) {
            getUser(followers[i]);
        }
        // eslint-disable-next-line
    }, [followers]);

    return (
        <>
            <div className='profileWrapper' >
                <Navbar />
                <Sidebar />
                <div className='profile'>
                    <ProfileImages />
                    <ProfileInfo />
                </div>
            </div>
        </>
    );
}