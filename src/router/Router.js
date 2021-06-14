import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import store from '../store/Store';
import logOut from '../actions/LogoutAction';
import Show from '../components/Show';

function Router() {
  const loggingOut = () => {
    axios.delete('https://floating-ocean-43337.herokuapp.com/logout').then(() => {
      store.dispatch(logOut);
      window.location.href = 'https://course-tracker-official.herokuapp.com';
    }).catch((error) => error);
  };

  const loggedInCheck = useSelector((state) => state.LogIn.login);
  return (
    <div>
      <nav>
        {loggedInCheck
          ? (
            <div className="nav-container">
              <a href="/dashboard">
                <EqualizerIcon />
                Courses
              </a>
              <a href="/dashboard">
                <DonutLargeIcon />
                Track.it
              </a>
              <a href="/" onClick={() => loggingOut()}>
                <ExitToAppIcon />
                Log out
              </a>
            </div>
          ) : ''}
      </nav>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home />
            )}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/course"
            render={() => (
              <Show />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Router;
