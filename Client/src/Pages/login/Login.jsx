import './login.css';

import { useContext, useState } from 'react';
import userContext from '../../Context/UserContext/userContext';
import { Link } from 'react-router-dom';

export default function Login() {

  const { loginUser } = useContext(userContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  //Login Function 
  const handleSubmit = (e) => {
    e.preventDefault();

    //Destructures credentials from credential state
    const { email, password } = credentials;

    //Sends the crendential to login function which fetches all the users data from the database in DOM
    loginUser(email, password);
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className='logo'>
          <img src={require('./k.png')} alt="" />
          <h1>ingbook</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id='email' name='email' placeholder='Email' value={credentials.email} onChange={handleChange} />
          <input type="password" id='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} />
          <button className='loginBtn' >Log in</button>
          <span>Forgot Password?</span>
          <Link to='/signup' className='signUpBtn' >Create New Account</Link>
        </form>
      </div>
    </div>
  )
}
