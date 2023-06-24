import React, { useContext, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import userContext from '../Context/UserContext/userContext';
import axios from 'axios';

const SearchResult = ({ searchQuery, setSearchQuery }) => {
  const { host, Navigate, mode } = useContext(userContext);
  const [searchResult, setSearchResult] = useState([]);
  const encodeSearchQuery = encodeURIComponent(searchQuery);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoader(true);
      try {
        const res = await axios.get(`${host}/api/users?search=${encodeSearchQuery}`);
        setSearchResult(res.data);
        setIsLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, [searchQuery]);

  return (
    <div className={`absolute popupAppear mt-14 w-[25%] rounded-lg bg-white shadow-[0_0_10px] p-3 gap-2 flex flex-col ${mode === "light" ? "shadow-slate-400" :"shadow-slate-700"}`}>
      {!isLoader ? searchResult.length !== 0 ? searchResult.map((user, index) => {
        return <div onClick={()=>{Navigate(`/profile/${user._id}`); setSearchQuery('')}} key={index} className='flex w-full items-center gap-2 text-slate-700 text-lg hover:bg-[#eaeafa] cursor-pointer rounded-md p-2'>
          <img src={`/Assets/Posts/${user.profilePicture}`} className='h-8 w-8 object-cover rounded-full' alt="" />
          <h2>{user.name}</h2>
        </div>
      }) : <div className='text-slate-700 text-center'>No Users Found</div> : <div className='w-full flex justify-center'><TailSpin height={30} width={30} color='blue' /></div>}
    </div>
  )
}

export default SearchResult