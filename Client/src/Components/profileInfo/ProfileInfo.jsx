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

import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/Loader';

export default function ProfileInfo() {

  const userId = localStorage.getItem('userId');
  const { id } = useParams();


  const { mainUser, user } = useContext(userContext);
  const { posts, getTimeline } = useContext(postContext)

  const currUser = userId === id ? mainUser : user;
  
  const userPosts = [];
  posts.forEach(e => {
    if(e.userId === id)
      userPosts.push(e)
  })

  const { school, city, from, createdAt } = currUser;
  const { followers } = mainUser;

  const date = new Date(createdAt);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Fetches all the users posts.
  useEffect(() => {
    getTimeline();
  }, [followers]);

  return (
    <div className='profileInfo'>

      <div className='profileInfoContainer'>

        <div className='profileInfoLeft'>

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
          <div className="profileInfoLeftBottom">
            <h2>Friends</h2>
            <span>{userId === id ? followers?.length : user.followers?.length} friends</span>
            <div className='profileInfoFriends'>
              {userId === id ? followers && followers.map((f) => { return <Friends key={f._id} user={f} /> }) : user.followers && user.followers.map((f) => { return <Friends key={f._id} user={f} /> })}
            </div>
          </div>
        </div>

        <div className='profileInfoRight'>
          {userId === id ? <Share /> : ""}
          {userPosts.length !== 0 ? userPosts.map((f) => {
                return <Post key={f._id} post={f} />
            }) : <Loader/> }
        </div>
      </div>
    </div>
  )
}
