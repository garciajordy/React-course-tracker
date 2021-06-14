import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Registration from './auth/Registration';
import LoginPanel from './auth/Login';
import store from '../store/Store';
import logIn from '../actions/LoginAction';

const Home = ({ loggedInStatus }) => {
  const history = useHistory();
  function checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true }).then((response) => {
      if (response.data.logged_in) {
        store.dispatch(logIn(response.data.user));
        history.push('/dashboard');
      }
    }).catch((error) => error);
  }
  useEffect(() => {
    checkLoginStatus();
  });
  return (
    <div className="dashboard">
      <div className="header">
        CourseTrack.it
      </div>
      <h1>Home</h1>
      <h1>{ loggedInStatus }</h1>
      <Registration />
      <LoginPanel />
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.bool.isRequired,
};
export default Home;
