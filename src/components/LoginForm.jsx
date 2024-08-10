import React, { useState } from 'react';
import '../App.css';
import dog1 from '../assets/logindog.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './Homepage'; // Import Header and Footer
import '../Homepage.css'; // Import necessary styles
import { loginController } from './axios/LoginAxios.js';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleSigninClick = async (e) => {
        e.preventDefault();
        try {
            const response = await loginController(email, password);
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
        <div className='login-form-container'>
            <Header />
            <video id="video-background" autoPlay loop muted>
                <source src={dog1} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div id="login-box">
                <div className="left">
                    <h1>Login</h1>
                    <input
                        className="enter"
                        type="text"
                        name="email"
                        placeholder="E-mail or Username"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        className="enter"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className="login" onClick={handleSigninClick}>
                        Sign in
                    </button>
                    {err && <p className="error-message">{err}</p>}
                    <Link className="noacc" to="/signup">Don't have an account? Signup</Link>
                </div>
                <div className="right">
                    <span className="loginwith">Sign in with<br />social network</span>
                    <a href="https://www.facebook.com/">
                        <button className="social-signin facebook">Log in with Facebook</button>
                    </a>
                    <a href="https://twitter.com/i/flow/login">
                        <button className="social-signin twitter">Log in with Twitter</button>
                    </a>
                    <a href="https://accounts.google.com/Login/signinchooser?ifkv=AWnogHeB-7Iqyltvkyg8GCu0f6ziyYCD60D0kGNflLZmpL2PVi3o2F9h2RycK8HemvlQhgicMkUvKA&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                        <button className="social-signin google">Log in with Google+</button>
                    </a>
                </div>
                <div className="or">OR</div>
            </div>
        </div>
    );
}

export default LoginForm;
