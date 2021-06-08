import React, { Component } from 'react'
import Registration from "./auth/Registration"
const Home = (loggedInStatus) => {
  
        return (
            <div>
                <h1>Home</h1>
                <h1>{ loggedInStatus }</h1>
                <Registration />
            </div>
        )
}

export default Home;