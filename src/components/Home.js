import React, { useEffect } from 'react';
import Registration from "./auth/Registration";
import LoginPanel from './auth/Login';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import store from "../store/Store"
import logIn from "../actions/LoginAction";

const Home = ({ loggedInStatus }) => {
    let history = useHistory()
    useEffect(() => {
    checkLoginStatus()
    })
    function checkLoginStatus() {
      axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
          console.log(response)
          if (response.data.logged_in) {
              store.dispatch(logIn(response.data.user))
              history.push("/dashboard")
          }
      }).catch(error => {
        console.log(error)
      })
    }
        return (
            <div className="dashboard">
                <h1>Home</h1>
                <h1>{ loggedInStatus }</h1>
                <Registration />
                <LoginPanel />
            </div>
        )
}

export default Home;