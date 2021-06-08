import React, { useState } from 'react'
import axios from 'axios';

function Registration() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        registrationErrors: ''
    })
    function handleSubmit(event) {
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: user.email,
                password: user.password,
                password_confirmation: user.password_confirmation
            }
        },
        { withCredentials: true }
        ).then(response => {
            console.log("registration res", response)
        }).catch(error => {
            console.log("registration error", error)
        })
        event.preventDefault();
    }

    function handleChange(e) {
        setUser((prev => ({...prev, [e.target.name]: e.target.value})))
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit} >
            <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleChange} required />
            <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} required />
                <input type='password' name='password_confirmation' placeholder='Password_confirmation' value={user.password_confirmation} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Registration

