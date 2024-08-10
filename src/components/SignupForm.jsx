import React, { useState } from 'react';
import '../App.css';
import dog1 from '../assets/logindog.mp4';
import { Header } from './Homepage'; // Import Header and Footer
import '../Homepage.css'; // Import necessary styles
import { RegisterController } from './axios/RegisterController';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); // Added state for retype password
  const [err, setErr] = useState('');

  const handleSignupClick = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!username || !email || !password || !retypePassword) {
      setErr('Please fill in all fields');
      return;
    }
    
    if (password !== retypePassword) {
      setErr('Passwords do not match');
      return;
    }

    try {
      const response = await RegisterController(username, email, password);
      if (response.status) {
        navigate('/');
      } else {
        setErr(response.message);
      }
    } catch (error) {
      setErr('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <Header />
      <video id="video-background" autoPlay loop muted>
        <source src={dog1} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div id="login-box">
        <div className="left">
          <h1>Signup</h1>
          <input
            className="enter"
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            className="enter"
            type="text"
            name="email"
            placeholder="E-mail"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className="enter"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            className="enter"
            type="password"
            name="retype-password"
            placeholder="Retype Password"
            onChange={(event) => setRetypePassword(event.target.value)}
          />
          <button className="login" onClick={handleSignupClick}>
            Sign up
          </button>
          {err && <p className="error-message">{err}</p>}
        </div>
        <div className="right">
          <span className="loginwith">Sign up with<br />social network</span>
          <a href="https://www.facebook.com/">
            <button className="social-signin facebook">Sign up with Facebook</button>
          </a>
          <a href="https://twitter.com/i/flow/signup">
            <button className="social-signin twitter">Sign up with Twitter</button>
          </a>
          <a href="https://accounts.google.com/SignUp?hl=en">
            <button className="social-signin google">Sign up with Google+</button>
          </a>
        </div>
        <div className="or">OR</div>
      </div>
    </div>
  );
}

export default SignupForm;
