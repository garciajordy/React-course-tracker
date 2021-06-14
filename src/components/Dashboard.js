import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import store from '../store/Store';
import logIn from '../actions/LoginAction';
import Course from './Course';
import AddCourseAction from '../actions/AddCourseAction';

export const COURSES = ['RubyOnRails', 'Ruby', 'JavaScript', 'React'];
const Dashboard = () => {
  const history = useHistory();
  const [courses, setCourses] = useState([]);
  function checkLoginStatus() {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true }).then((response) => {
      if (response.data.logged_in) {
        store.dispatch(logIn(response.data.user));
      } else {
        history.push('/');
      }
    }).catch(() => {
      history.push('/');
    });
  }
  useEffect(() => {
    checkLoginStatus();
    axios.get('http://localhost:3001/courses').then((response) => {
      setCourses(response.data.map((data) => data));
    });
  }, []);
  const clickHandler = (course) => {
    store.dispatch(AddCourseAction(course));
  };
  return (
    <div>
      <div className="header">
        All courses.it
      </div>
      <h1 className="dashboard">Dashboard</h1>
      <div className="course-container">

        {courses.map((course) => (
          <Course key={course.id} handleClick={clickHandler} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
