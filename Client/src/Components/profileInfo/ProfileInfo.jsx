import './profileInfo.css'

import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

import Share from '../share/Share'
import Post from '../post/Post';
import Friends from '../friends/Friends';

import userContext from '../../Context/UserContext/userContext';
import postContext from '../../Context/PostContext/postContext';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';

export default function ProfileInfo() {

  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const [currUser, setCurrUser] = useState({});

  const [isLoader1, setIsLoader1] = useState(false);
  const [isLoader2, setIsLoader2] = useState(false);
  const { mainUser, mode, host } = useContext(userContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const res = await axios.get(`${host}/api/users/${id}`);
        setCurrUser(res.data);
        setIsLoader2(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrUser();
  }, [mainUser, id]);


  const { school, city, from, createdAt } = currUser;
  const { followers } = mainUser;

  const date = new Date(createdAt);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Fetches all the users posts.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${host}/api/posts/${id}`);
        setUserPosts(res.data);
        setIsLoader1(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, [id, mainUser]);

  return (
    <div className='profileInfo'>
      <div className='profileInfoContainer'>
        <div className='profileInfoLeft gap-5'>
          <div className='profileInfoLeftTop'>
            <h2>Intro</h2>
            <button style={id !== userId ? { display: "none" } : {}} >Add Bio</button>
            <div className="profileInfoPersonel">
              <SchoolIcon className='profileInfoIcon' />
              <span>Went to <strong>{school}</strong></span>
            </div>
            <div className="profileInfoPersonel">
              <HomeIcon className='profileInfoIcon' />
              <span>Lives in <strong>{city}</strong></span>
            </div>
            <div className="profileInfoPersonel">
              <LocationOnIcon className='profileInfoIcon' />
              <span>From <strong>{from}</strong></span>
            </div>
            <div className="profileInfoPersonel">
              <AccessTimeFilledIcon className='profileInfoIcon' />
              <span>Joined on {months[date.getMonth()]} {date.getFullYear()}</span>
            </div>
            <button style={id !== userId ? { display: "none" } : {}} >Edit Details</button>
            <button style={id !== userId ? { display: "none" } : {}} >Add Hobbies</button>
            <button style={id !== userId ? { display: "none" } : {}} >Add Featured</button>
          </div>
          <div className={`flex flex-col gap-3 p-4 text-slate-700 ${mode === "light" ? "bg-white shadow-slate-400" : "bg-[#404258] shadow-[#48487a] text-[#ccf]"} rounded-lg shadow-[0_0_3px] `}>
            <div className='flex items-end gap-2'>
              <h3 className={`text-3xl ${mode ==="light" ? "text-[#559]" : "text-white"}`}>Followers</h3>
              <span>({currUser.followers?.length} Follower)</span>
            </div>
            {!isLoader2 ? <div className='grid grid-cols-3'>
              {currUser?.followers?.length !== 0 && currUser.followers?.map((follower, index) => {
                return <Friends key={follower} user={follower}/>
              })}
            </div> : <div className='w-full p-3 h-full flex justify-center items-center'><TailSpin height={30} width={30} color='blue'/></div>}
          </div>
          <div className={`flex flex-col gap-3 p-4 text-slate-700 ${mode === "light" ? "bg-white shadow-slate-400" : "bg-[#404258] shadow-[#48487a]"} rounded-lg shadow-[0_0_3px] `}>
            <div className='flex items-end gap-2'>
              <h3 className={`text-3xl ${mode ==="light" ? "text-[#559]" : "text-white"}`}>Followings</h3>
              <span>({currUser.followings?.length} Following)</span>
            </div>
            {!isLoader2 ? <div className='grid grid-cols-3'>
              {currUser?.followings?.length !== 0 && currUser.followings?.map((following) => {
                return <Friends key={following} user={following}/>
              })}
            </div> : <div className='w-full p-3 h-full flex justify-center items-center'><TailSpin height={30} width={30} color='blue'/></div>}
          </div>
        </div>

        <div className='profileInfoRight gap-5'>
          {userId === id ? <Share /> : ""}
          {!isLoader1 ? userPosts.length !== 0 ? userPosts.map((f) => {
            return <Post key={f._id} post={f} />
          }) : <div className={`w-full flex justify-center items-center ${mode === "light" ? "text-slate-700" : "text-white"} text-lg`}>You haven't Posted yet!</div> : <div className='w-full h-40 flex justify-center items-center'><TailSpin height={60} width={60} color={mode === "light" ? "blue" : "white"} /></div>}
        </div>
      </div>
    </div>
  )
}
