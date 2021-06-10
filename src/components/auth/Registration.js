import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import store from "../../store/Store"
import logIn from "../../actions/LoginAction";

function Registration() {
    let history = useHistory()
    const [data, setData] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        registrationErrors: ''
    })
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
                store.dispatch(logIn(response.data.user))
                history.push("/dashboard")
            };
        }).catch(error => {
            console.log("registration error", error)
            if (data.password.length < 6) {
                setData((prev => ({
                    ...prev,
                    registrationErrors: "Password needs a minimum of 6 characters."
                })))
            }
            else if (data.password !== data.password_confirmation) {
                console.log()
                setData((prev => ({
                    ...prev,
                    registrationErrors: "Password confirmation is not correct!."
                })))
            } else {

                setData((prev => ({
                    ...prev,
                    registrationErrors: "Email has already been taken."
                })))
            }
        })
        event.preventDefault();
    }

    function handleChange(e) {
        setData((prev => ({...prev, [e.target.name]: e.target.value})))
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
               <p> {data.registrationErrors}</p>
            <input type='email' name='email' placeholder='Email' value={data.email} onChange={handleChange} required />
            <input type='password' name='password' placeholder='Password' value={data.password} onChange={handleChange} required />
                <input type='password' name='password_confirmation' placeholder='Password_confirmation' value={data.password_confirmation} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Registration

