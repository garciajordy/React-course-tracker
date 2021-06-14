import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Course({ handleClick, course }) {
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
  course: PropTypes.string.isRequired,
};
export default Course;
