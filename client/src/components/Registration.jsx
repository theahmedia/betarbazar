import React, { useState } from 'react';

function Registration() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 11) {
            setPhone(value);
            setError('');
        } else {
            setError('Please enter a valid phone number starting with 01 and 11 digits long');
            // Play warning sound here if needed
            const audio = new Audio('/bip-sound.mp3');
            audio.play();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Phone Number" 
                value={phone} 
                onChange={handlePhoneChange} 
            />
            {error && <div className="error">{error}</div>}
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
            </button>
            <input 
                type="email" 
                placeholder="Optional Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Registration;
