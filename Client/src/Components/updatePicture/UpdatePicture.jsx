import './updatePicture.css';

import postContext from '../../Context/PostContext/postContext';
import userContext from '../../Context/UserContext/userContext';

import { useContext, useState } from 'react';

export default function UpdatePicture({ name }) {

  const [image, setImage] = useState(null);
  const { uploadPost } = useContext(postContext);
  const { updateUserCoverPicture, mainUser } = useContext(userContext);

  const handleSubmit = async () => {
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      mainUser.coverPicture = filename;

      //Uploads the post and saves it in the specified location.
      uploadPost(data);

      //Updates the cover picture in the database.
      updateUserCoverPicture(mainUser.coverPicture);
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
