import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses , setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // '/courses/slug:
    if(courses.length === 0){
      courseActions.loadCourses();
    }
    else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange(){
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    const target = event.target;
    const update = { ...course, [target.name]: target.value };
    setCourse(update);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "title is req";
    if (!course.authorId) _errors.authorId = "auid is req";
    if (!course.category) _errors.category = "cat is req";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Kurs başarıyla eklendi ..");
    });
  }

  return (
    <>
      <h2>Kurs Ekle-Çıkar</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
