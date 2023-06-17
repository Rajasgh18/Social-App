import './updatePicture.css';

import postContext from '../../Context/PostContext/postContext';
import userContext from '../../Context/UserContext/userContext';
import axios from 'axios';
import { useContext, useState } from 'react';

export default function UpdatePicture({ name }) {

  const [image, setImage] = useState(null);
  const { uploadPost } = useContext(postContext);
  const { setMainUser, mainUser, host } = useContext(userContext);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);

      try {
        //Uploads the post and saves it in the specified location.
        let res = await axios.post(`${host}/api/posts/upload`, data);
        //Updates the cover picture in the database.
        res = await axios.put(`${host}/api/users/${userId}`, { userId, coverPicture: filename })
        setMainUser({...mainUser, coverPicture: filename})
      } catch (error) {
        console.error(error);
      };
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='updatePictureWrapper'>
        <input style={{ display: "none" }} type="file" accept='.jpg, .jpeg' id="uploadImage" onChange={e => setImage(e.target.files[0])} />
        <label className='updateImageBtn' htmlFor='uploadImage'>Select Image</label>
        <button type='submit' className='updateImageBtn' >Upload Image</button>
      </form>
    </>
  )
}
