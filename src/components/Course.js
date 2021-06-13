import React from 'react'
import { Link } from "react-router-dom";

function Course({ handleClick, course }) {
    return (
        <div>
            <Link onClick={()=>handleClick(course)} to={"/course"}>
            <h1>{ course.name }</h1>
            </Link>
        </div>
    )
}

export default Course
