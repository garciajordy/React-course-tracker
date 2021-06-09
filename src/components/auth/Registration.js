import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Registration() {
    let history = useHistory()
    const [data, setData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        registrationErrors: ''
    })
    const [user, setUser] = useState({});
    function handleSubmit(event) {
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === "created") {
                setUser(response.data)
                history.push("/dashboard")
            };
        }).catch(error => {
            console.log("registration error", error)
        })
        event.preventDefault();
    }

    function handleChange(e) {
        setData((prev => ({...prev, [e.target.name]: e.target.value})))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
            <input type='email' name='email' placeholder='Email' value={data.email} onChange={handleChange} required />
            <input type='password' name='password' placeholder='Password' value={data.password} onChange={handleChange} required />
                <input type='password' name='password_confirmation' placeholder='Password_confirmation' value={data.password_confirmation} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Registration

