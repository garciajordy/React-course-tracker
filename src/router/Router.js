import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "../components/Home"
import Dashboard from "../components/Dashboard"

function Router() {
    const [loggedIn, setLoggedIn] = useState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
    })

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} render={() => (
                        <Home loggedInStatus={loggedIn.loggedInStatus}/>
                    )} />
                    <Route exact path={"/dashboard"} component={Dashboard} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router
