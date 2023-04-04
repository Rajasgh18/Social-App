import './signup.css';

import UserContext from '../../Context/UserContext/userContext';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {

  const { createUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

  //Stores all the data given by the user
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Destructures all the details of user
    const { username, email, password } = credentials;

    //Sends all the credentials to the database and creates user and redirects to the home page
    createUser(username, email, password);
  }

  return (
    <div className='signup'>
      <div className="signupWrapper">
        <div className='logo'>
          <img src={require('./k.png')} alt="" />
          <h1>ingbook</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id='username' name='username' placeholder='Username' value={credentials.username} onChange={handleChange} />
          <input type="text" id='email' name='email' placeholder='Email' value={credentials.email} onChange={handleChange} />
          <input type="password" id='password' name='password' placeholder='Password' value={credentials.password} onChange={handleChange} />
          <button>Sign up</button>
          <Link to='/login' className='loginLink'>Already have a Account?</Link>
        </form>
      </div>
    </div>
  )
}
