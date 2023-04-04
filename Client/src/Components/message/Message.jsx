import './message.css'

import userContext from '../../Context/UserContext/userContext';
import { useContext } from 'react';
import { format } from 'timeago.js'

export default function Message({ message, own, user }) {

  const { mainUser } = useContext(userContext);
  const { profilePicture } = mainUser;
  const userPic = profilePicture ? require(`../../../public/Assets/Posts/${own ? profilePicture : user.profilePicture}`) : "userIcon.webp";

  let date = new Date(message.createdAt);


  return (
    <div className='messageBox' style={own ? { alignItems: "end" } : { alignItems: "start" }}>
      <div className={`${own ? "mainUserMessages" : "userMessages"}`}>
        <img style={own ? { display: "none" } : {}} src={userPic} alt='' />
        <p id='mesgText'>{message.text}</p>
      </div>
      <span>{format(date)}</span>
    </div>
  )
}
