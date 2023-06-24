import './profileImages.css'

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';

import UpdatePicture from '../updatePicture/UpdatePicture';
import UpdateProfile from '../updateProfile/UpdateProfile';

import userContext from '../../Context/UserContext/userContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

export default function ProfileImages() {

  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const [currUser, setCurrUser] = useState({});

  const { host, mainUser, setMainUser } = useContext(userContext);

  const { name, followers, profilePicture, coverPicture } = currUser;
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        const res = await axios.get(`${host}/api/users/${id}`);
        setCurrUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCurrUser();
  }, [id, mainUser]);

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

  const handleFollow = async () => {
    try {
      setIsLoader(true);
      if (mainUser.followings.find(u => u === currUser._id)) {
        const res = await axios.put(`${host}/api/users/unfollow/${currUser._id}`, { userId });
        setMainUser(prev => {
          let u = { ...prev };
          u.followers = u.followers.filter(u => u !== currUser._id);
          return u;
        })
      } else {
        const res = await axios.put(`${host}/api/users/follow/${currUser._id}`, { userId });
        setMainUser(prev => {
          const u = { ...prev };
          u.followers.push(currUser._id);
          return u;
        })
      }
      setIsLoader(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='profileImages' >
      <div className="profileImagesWrapper">
        <div className="profileCover">
          <img src={coverPicture ? `/Assets/Posts/${coverPicture}` : "null"} alt="" />
          <div style={id !== userId ? { display: "none" } : {}} id="profileCoverBtn" onClick={updateCover} className="profileCoverBtn">
            <span><CameraAltIcon className='profileCoverIcon' /></span>
            Add Cover Photo
            <div id='updateMenuCover'><UpdatePicture name="coverPicture" /></div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileBottomLeft">
            <div className="profileImage">
              <img src={`/Assets/Posts/${profilePicture ? profilePicture : "userIcon.webp"}`} alt="" />
              <div style={id !== userId ? { display: "none" } : {}} onClick={updateProfile} id="profileImageCameraBtn" className="profileImageCameraBtn">
                <CameraAltIcon className='profileIcon' />
                <div id='updateMenuProfile'><UpdateProfile name="profilePicture" /></div>
              </div>
            </div>
            <div className="profileDetails">
              <h1>{name}</h1>
              <span>{followers?.length} Friends</span>
              {id !== userId && <button onClick={handleFollow} className='bg-blue-500 p-2 hover:bg-blue-600 mt-2 rounded-md text-lg flex justify-center text-white w-24'>{!isLoader ? mainUser.followings.find(u => u === currUser._id) ? "Unfollow" : "Follow" : <TailSpin height={28} width={28} color='white' />}</button>}
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
