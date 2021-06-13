import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "../components/Home"
import Dashboard from "../components/Dashboard"
import { useSelector } from 'react-redux'
import axios from "axios";
import store from "../store/Store";
import logOut from "../actions/LogoutAction";
import Show from "../components/Show";

function Router() {
    const loggingOut = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            store.dispatch(logOut)
            window.location.href = 'http://localhost:3000';
        }).catch(error => error)
    }

    const loggedInCheck = useSelector((state) => state.LogIn.login)
    return (
        <div>
            <nav>
               { loggedInCheck ? <button onClick={()=> loggingOut()}>LOG OUT</button> : ""}
            </nav>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} render={() => (
                        <Home />
                    )} />
                    <Route exact path={"/dashboard"} component={Dashboard} />
                    <Route exact path={"/course"} render={() => (
                        <Show name={"TEST"} id={1} />
                    )} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router
