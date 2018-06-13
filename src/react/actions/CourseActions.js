import dispatcher from "../dispatcher";
import axios from "axios";

export function reloadCourses() {

    dispatcher.dispatch({
        type: "FETCH_COURSES"});

    axios.get('/api/courses')
        .then(function (response) {

            console.log(response);

            dispatcher.dispatch({
                type: "LOADED_COURSES",
                courses: response.data.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function newCourse({name, course_number, units, description, wrap_description, featured}) {

    dispatcher.dispatch({
        type: "POSTING_COURSE"});

    axios.post('/api/courses', {name, course_number, units, description, wrap_description, featured})
        .then(function (response) {
            console.log(response);
            reloadCourses();

            dispatcher.dispatch({
                type: "NEW_COURSE_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "NEW_COURSE_ERROR"
            });
        });
}

export function editCourse({course_id, name, course_number, units, description, wrap_description, featured}) {

    dispatcher.dispatch({
        type: "PATCHING_COURSE"
    });

    axios.patch('/api/courses', {course_id, name, course_number, units, description, wrap_description, featured})
        .then(function (response) {
            console.log(response);
            reloadCourses();

            dispatcher.dispatch({
                type: "EDIT_COURSE_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "EDIT_COURSE_ERROR"
            });
        });
}