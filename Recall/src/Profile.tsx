import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    username: string;
    password: string;
    email: string;
}

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // retreiving user data from local storage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUserData(JSON.parse(storedUser));
    }, [navigate]);

    if (!userData) return null

    return (
        <div className="profile-container">
            <h1>Welcome {userData.username}</h1>
            <div className="profile-details">
                <p>Email: {userData.email}</p>
                <button
                    onClick={() => {
                        localStorage.removeItem('user');
                        navigate('/login')
                    }} 
                >
                    Logout
                </button>
            </div>
        </div>
    )
}