import './updateProfile.css';

import postContext from '../../Context/PostContext/postContext';
import userContext from '../../Context/UserContext/userContext';

import { useContext, useState } from 'react';

export default function UpdateProfile({ name }) {

  const [image, setImage] = useState(null);
  const { uploadPost } = useContext(postContext);

  const { updateUserProfilePicture, mainUser } = useContext(userContext);

  const handleSubmit = async (e) => {
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      mainUser.profilePicture = filename;

      //Uploads the post and saves it in the specified location.
      uploadPost(data);

      //Updates the cover picture in the database.
      updateUserProfilePicture(mainUser.profilePicture);
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
