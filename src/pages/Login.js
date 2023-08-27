import React, { useEffect, useState } from 'react';
import './Auth.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { setUser } from '../store/UserSlice'
import { loginUser } from '../api'
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  console.log(userId);
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
  }, [userId, dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password); 

      if (response.data.success) {
        dispatch(setUser({ userId: response.data.user._id, token: response.data.token }));
        localStorage.setItem('userData', JSON.stringify({ userId: response.data.user._id, token: response.data.token }));
        navigate('/');
      } else {
        console.error('Login failed');
        setError('Login failed'); 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in: ' + error?.response?.data?.message); 
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken');
  //   dispatch(clearUser());
  //   navigate('/login');
  // };

  return (
    <div className='parent-container'>
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
    </div>
  );
}

export default Login;
