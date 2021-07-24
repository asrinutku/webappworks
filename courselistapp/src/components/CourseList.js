import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList(props) {
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th>sil</th>
          <th>title</th>
          <th>id</th>
          <th>category</th>
        </tr>
      </thead>

      <tbody>
        {props.courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={props.deleteCourse(course.id)}
                >
                  sil
                </button>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseList;
