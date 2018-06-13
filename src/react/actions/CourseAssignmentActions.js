import dispatcher from "../dispatcher";
import axios from "axios";

export function reloadCourseAssignments() {

    dispatcher.dispatch({
        type: "FETCH_COURSE_ASSIGNMENTS"});

    axios.get('/api/courses/assignments')
        .then(function (response) {

            console.log(response);

            dispatcher.dispatch({
                type: "LOADED_COURSE_ASSIGNMENTS",
                course_assignments: response.data.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function newCourseAssignment({course_id, faculty_id, year, term, team_lead}) {

    dispatcher.dispatch({
        type: "POSTING_COURSE_ASSIGNMENT"});

    axios.post('/api/courses/assignments', {course_id, faculty_id, year, term, team_lead})
        .then(function (response) {
            console.log(response);

            reloadCourseAssignments();

            dispatcher.dispatch({
                type: "NEW_COURSE_ASSIGNMENT_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "NEW_COURSE_ASSIGNMENT_ERROR"
            });
        });
}

export function editCourseAssignment({course_assignment_id, course_id, faculty_id, year, term, team_lead}) {

    dispatcher.dispatch({
        type: "PATCHING_COURSE_ASSIGNMENT"
    });

    axios.patch('/api/courses/assignments', {course_assignment_id, course_id, faculty_id, year, term, team_lead})
        .then(function (response) {
            console.log(response);
            reloadCourseAssignments();

            dispatcher.dispatch({
                type: "EDIT_COURSE_ASSIGNMENT_SUCCESS"
            });

        })
        .catch(function (error) {
            console.log(error);

            dispatcher.dispatch({
                type: "EDIT_COURSE_ASSIGNMENT_ERROR"
            });
        });
}