import './profileImages.css'

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';

import UpdatePicture from '../updatePicture/UpdatePicture';
import UpdateProfile from '../updateProfile/UpdateProfile';

import userContext from '../../Context/UserContext/userContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfileImages() {

  const userId = localStorage.getItem('userId');
  const { id } = useParams();

  const { mainUser, user } = useContext(userContext);

  const currUser = userId === id ? mainUser : user;
  const { name, followers, profilePicture, coverPicture } = currUser;
  const profilePic = `/Assets/Posts/${profilePicture ? profilePicture : "userIcon.webp"}`;
  const coverPic = coverPicture ? `/Assets/Posts/${coverPicture}` : "null";

  //Update function for cover.
  const updateCover = () => {
    let element = document.getElementById("profileCoverBtn");
    let editMenu = document.getElementById("updateMenuCover");

    editMenu.style.display = "flex";

    document.addEventListener('mouseup', function (e) {
      if (!element.contains(e.target))
        editMenu.style.display = "none";
    });
  }

  //Update function for profile.
  const updateProfile = () => {
    let container = document.getElementById("profileImageCameraBtn");
    let updatePro = document.getElementById("updateMenuProfile");

    updatePro.style.display = "flex";

    document.addEventListener('mouseup', function (e) {
      if (!container.contains(e.target))
        updatePro.style.display = "none";
    });
  }

  return (
    <div className='profileImages' >
      <div className="profileImagesWrapper">
        <div className="profileCover">
          <img src={coverPic} alt="" />
          <div style={id !== userId ? { display: "none" } : {}} id="profileCoverBtn" onClick={updateCover} className="profileCoverBtn">
            <span><CameraAltIcon className='profileCoverIcon' /></span>
            Add Cover Photo
            <div id='updateMenuCover'><UpdatePicture name="coverPicture" /></div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileBottomLeft">
            <div className="profileImage">
              <img src={profilePic} alt="" />
              <div style={id !== userId ? { display: "none" } : {}} onClick={updateProfile} id="profileImageCameraBtn" className="profileImageCameraBtn">
                <CameraAltIcon className='profileIcon' />
                <div id='updateMenuProfile'><UpdateProfile name="profilePicture" /></div>
              </div>
            </div>
            <div className="profileDetails">
              <h1>{name}</h1>
              <span>{followers?.length} Friends</span>
              <div className='profileFriends'>
              </div>
            </div>
          </div>
          <div className="profileBottomRight">
            <div style={id !== userId ? { display: "none" } : {}} className='profileBottomRightBtns'>
              <div className="addStoryBtn">
                <AddCircleIcon />
                <span>Add to story</span>
              </div>
              <div className="editProfileBtn">
                <CreateIcon className='profileIcon' />
                <span>Edit Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
