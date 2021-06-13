import React from 'react'
import { Link } from "react-router-dom";

function Course({ handleClick, course }) {
    return (
        <div className="course-component">
            <Link onClick={()=>handleClick(course)} to={"/course"}>
            { course.name }
            </Link>
        </div>
    )
}

export default Course
