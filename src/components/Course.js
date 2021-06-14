import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Course({ handleClick, courseName, courseId }) {
  const course = {
    name: courseName,
    id: courseId,
  };
  return (
    <div className="course-component">
      <Link onClick={() => handleClick(course)} to="/course">
        { course.name }
      </Link>
    </div>
  );
}
Course.propTypes = {
  handleClick: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
};
export default Course;
