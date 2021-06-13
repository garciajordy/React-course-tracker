import React, { useEffect, useState } from 'react';
import axios from "axios";
import store from "../store/Store";
import { useHistory } from 'react-router-dom';
import logIn from "../actions/LoginAction";
import Course from "./Course";
import AddCourseAction from "../actions/AddCourseAction";

export const COURSES = ["RubyOnRails", "Ruby", "JavaScript", "React"]
const Dashboard = () => {
    let history = useHistory()
    const [courses, setCourses] = useState([])
    useEffect(() => {
        checkLoginStatus()
        axios.get("http://localhost:3001/courses").then(response => {
                setCourses(response.data.map(data => data))
            })
    },[])
    function checkLoginStatus() {
        axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
            console.log(response)
            if (response.data.logged_in) {
                store.dispatch(logIn(response.data.user))
            } else {
                history.push("/")
                console.log("heeeeeeeee",response)
            }
        }).catch(error => {
            history.push("/")
          console.log(error)
        })
      }
    const clickHandler = (course) => {
        store.dispatch(AddCourseAction(course))
        console.log(course)
      }
    return (
        <div>
            <h1 className="dashboard">Dashboard</h1>
            <div className="course-container">

            {courses.map(course => (
                <Course key={course.id} handleClick={clickHandler} course={course} />
            ))}
            </div>
        </div>
    )
}

export default Dashboard
