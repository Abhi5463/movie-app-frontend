import React, { useEffect, useState } from 'react';
import './Register.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/UserSlice'
import { registerUser } from '../api'
import { Link } from 'react-router-dom';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { userId, token } = JSON.parse(storedUserData);
      dispatch(setUser({ userId, token }));
    }
  
      if (userId) {
        navigate('/');
        return;
      }
    }, [userId]);


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log(username, password, email);
      const response = await registerUser(username, email, password); 

      if (response.data.success) {
        dispatch(setUser({ userId: response.data.user._id, token: response.data.token }));
        localStorage.setItem('userData', JSON.stringify({ userId: response.data.user._id, token: response.data.token }));
        navigate('/');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('Error registering: ' + error?.response?.data?.message); 
    }
  };

  return (
    <div className="parent-container">
    <div className="auth-container">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="register-username">Username</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">LogIn</Link></p>
    </div>
    </div>
  );
}

export default Register;
