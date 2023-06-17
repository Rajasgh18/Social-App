import './login.css';

import { useContext, useRef, useState } from 'react';
import userContext from '../../Context/UserContext/userContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';

export default function Login() {
  const authRef = useRef();
  const { host, Navigate, setMainUser } = useContext(userContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoader, setIsloader] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  //Login Function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloader(true);
    //Sends the crendential to login function which fetches all the users data from the database in DOM
    try {
      const res = await axios.post(`${host}/api/auth/login`, credentials);
      setMainUser(res.data.user);
      localStorage.setItem('token', res.data.authToken);
      localStorage.setItem('userId', res.data.user._id);
      setIsloader(false);
      Navigate("/");
    } catch (error) {
      authRef.current.innerText = error.response.data;
      setIsloader(false);
    }
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className='logo'>
          <img src='/k.png' alt="" />
          <h1>ingbook</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id='email' name='email' placeholder='Email' value={credentials.email} onChange={handleChange} />
          <input type="password" id='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} />
          <div ref={authRef} className='text-red-600 text-center my-2'></div>
          <button className='loginBtn flex justify-center items-center p-2' >{!isLoader ? "Log in" : <TailSpin color='white' height={35} width={35} />}</button>
          <span>Forgot Password?</span>
          <Link to='/signup' className='signUpBtn' >Create New Account</Link>
        </form>
      </div>
    </div>
  )
}
