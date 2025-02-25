import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile'
import { Routes, Route, Link } from 'react-router-dom'
// import './Login.css'

interface UserData {
    username: string;
    password: string;
    email: string;
}

export default function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (i: React.FormEvent) => {
        i.preventDefault();
        if (isLogin) {
            // handling the login functionality
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/profile')
        } else {
            // handling the registration functionality
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/profile')
        }
    };

    return (
        <>
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={userData.username}
                        onChange={(i) => setUserData({...userData, username: i.target.value})}
                        required
                    />
                )}
                <input
                    type="text"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(i) => setUserData({...userData, email: i.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(i) => setUserData({...userData, password: i.target.value})}
                    required
                />
                <button 
                    type="submit"
                    className="login-button"
                    // onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    className="toggle-button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Register" : "Login"}
                </button>
            </p>
        </div> 
        </>
    );
}