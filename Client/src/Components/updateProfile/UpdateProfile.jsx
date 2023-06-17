import './updateProfile.css';

import postContext from '../../Context/PostContext/postContext';
import userContext from '../../Context/UserContext/userContext';

import { useContext, useState } from 'react';
import axios from 'axios';

export default function UpdateProfile({ name }) {

  const [image, setImage] = useState(null);
  const userId = localStorage.getItem('userId');
  const { mainUser, setMainUser, host } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);

      try {
        //Uploads the post and saves it in the specified location.
        //Uploads the post and saves it in the specified location.
        let res = await axios.post(`${host}/api/posts/upload`, data);
        //Updates the profile picture in the database.
        res = await axios.put(`${host}/api/users/${userId}`, { userId, profilePicture: filename })
        setMainUser({ ...mainUser, profilePicture: filename })
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='updateProfileWrapper'>
        <input style={{ display: "none" }} type="file" accept='.jpg, .jpeg' id="uploadProfile" onChange={e => setImage(e.target.files[0])} />
        <label className='updateProfileBtn' htmlFor='uploadProfile'>Select Image</label>
        <button type='submit' className='updateProfileBtn' >Upload Image</button>
      </form>
    </>
  )
}
