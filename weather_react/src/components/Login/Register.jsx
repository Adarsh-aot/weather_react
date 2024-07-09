import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  , Link} from 'react-router-dom';
import './Login.css';

function Register() {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log('Form submitted:', state);
    
    try {
      const response = await axios.post('https://backend-l627.onrender.com/registration/register', state);
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Registration successful!');
        setState({ email: '', password: '' }); // Clear the form
        navigate('/product');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-body">
        {message && <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
          <h2 className="login-card-title">Register</h2>
          
          <form onSubmit={handleSubmit}>
          <div id="emailHelp" className="login-form-text">We'll never share your email with anyone else.</div>
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">Email address</label>
              <input 
                type="text"
                className="login-form-control"
                id="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                aria-describedby="emailHelp"
                required
              />
              
            </div>
            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label">Password</label>
              <input 
                type="password"
                className="login-form-control"
                id="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-btn btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
