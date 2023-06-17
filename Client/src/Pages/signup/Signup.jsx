import './signup.css';

import UserContext from '../../Context/UserContext/userContext';

import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

export default function Signup() {

  const [isLoader, setIsloader] = useState(false);
  const authRef = useRef();
  const { host, Navigate, setMainUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  //Stores all the data given by the user
  const handleChange = async (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloader(true);

    //Sends all the credentials to the database and creates user and redirects to the home page
    try {
      if (credentials.name.length < 3)
        authRef.current.innerText = "Please enter name with more than 3 letters!";
      else if (credentials.password.length < 6)
        authRef.current.innerText = "Please enter password more than 6 letters!";
      else {
        const res = await axios.post(`${host}/api/auth/register`, credentials);
        setMainUser(res.data.user);
        localStorage.setItem('token', res.data.authToken);
        localStorage.setItem('userId', res.data.user._id);
        Navigate("/");
      }
      setIsloader(false);
    } catch (error) {
      authRef.current.innerText = error.response.data;
      setIsloader(false);
    }
  }

  return (
    <div className='signup'>
      <div className="signupWrapper">
        <div className='logo'>
          <img src='./k.png' alt="" />
          <h1>ingbook</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id='name' name='name' placeholder='Name' value={credentials.name} onChange={handleChange} />
          <input type="text" id='email' name='email' placeholder='Email' value={credentials.email} onChange={handleChange} />
          <input type="password" id='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} />
          <div ref={authRef} className='text-red-600 text-center my-2'></div>
          <button className='loginBtn flex justify-center items-center p-2' >{!isLoader ? "Sign up" : <TailSpin color='white' height={35} width={35} />}</button>
          <Link to='/login' className='loginLink'>Already have a Account?</Link>
        </form>
      </div>
    </div>
  )
}
