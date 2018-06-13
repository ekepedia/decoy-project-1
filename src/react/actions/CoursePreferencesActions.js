import dispatcher from "../dispatcher";
import axios from "axios";

export function reloadCoursePreferences() {

    dispatcher.dispatch({
        type: "FETCH_COURSE_PREFERENCES"});

    axios.get('/api/courses/preferences')
        .then(function (response) {

            console.log(response);

            dispatcher.dispatch({
                type: "LOADED_COURSE_PREFERENCES",
                courses: response.data.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function newCoursePreference({course_id, faculty_id, year, term}) {

    dispatcher.dispatch({
        type: "POSTING_COURSE_PREFERENCE"});

    axios.post('/api/courses/preferences', {course_id, faculty_id, year, term})
        .then(function (response) {
            console.log(response);

            reloadCoursePreferences();

            dispatcher.dispatch({
                type: "NEW_COURSE_PREFERENCE_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "NEW_COURSE_PREFERENCE_ERROR"
            });
        });
}

export function editCourse({course_preference_id, course_id, faculty_id, year, term}) {

    dispatcher.dispatch({
        type: "PATCHING_COURSE_PREFERENCE"
    });

    axios.patch('/api/courses/preferences', {course_preference_id, course_id, faculty_id, year, term})
        .then(function (response) {
            console.log(response);
            reloadCoursePreferences();

            dispatcher.dispatch({
                type: "EDIT_COURSE_PREFERENCE_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "EDIT_COURSE_PREFERENCE_ERROR"
            });
        });
}