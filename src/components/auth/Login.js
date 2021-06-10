import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import store from "../../store/Store"
import logIn from "../../actions/LoginAction";

function LoginPanel() {
    let history = useHistory()
    const [data, setData] = useState({
        email: '',
        password: '',
        loginErrors: ''
    })
    function handleSubmit(event) {
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: data.email,
                password: data.password
            }
        },
            { withCredentials: true }
        ).then(response => {
            if (response.data.status === "created") {
                store.dispatch(logIn(response.data.user))
                history.push("/dashboard")
                
            } else {
                setData((prev => ({
                    ...prev,
                    loginErrors: "Invalid email or password."
                })))
        }
        }).catch(error => {
            console.log("login error", error)
            setData((prev => ({
                ...prev,
                loginErrors: "Invalid email or password."
            })))
           
        })
        event.preventDefault();
    }

    function handleChange(e) {
        setData((prev => ({...prev, [e.target.name]: e.target.value})))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
               <p> {data.loginErrors}</p>
            <input type='email' name='email' placeholder='Email' value={data.email} onChange={handleChange} required />
            <input type='password' name='password' placeholder='Password' value={data.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPanel;

