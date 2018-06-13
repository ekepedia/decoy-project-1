import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import _ from "lodash";

import * as CourseAssignmentActions from "../actions/CourseAssignmentActions";


class CourseAssignmentStore extends EventEmitter {

    constructor() {
        super();

        CourseAssignmentActions.reloadCourseAssignments();
    }

    loadCourseAssignments(action) {
        this.course_assignments = action.course_assignments;

        this.emit("courses assignments loaded");
    }

    getCourseAssignments() {
        return this.course_assignments;
    }

    getCourseAssignmentsByCourse(course_id) {
        return _.find(this.course_assignments, function(ca) {
            return parseInt(ca.course_id) === parseInt(course_id);
        });
    }

    getCourseAssignmentsById(course_assignment_id) {
        return _.find(this.course_assignments, function(ca) {
            return parseInt(ca.course_assignment_id) === parseInt(course_assignment_id);
        });
    }

    getCourseAssignmentsByFaculty(faculty_id) {
        return _.find(this.course_assignments, function(ca) {
            return parseInt(ca.faculty_id) === parseInt(faculty_id);
        });
    }

    newCourseAssignmentSuccess(){
        this.emit("new course assignment success");
    }

    newCourseAssignmentError(){
        this.emit("new course assignment error");
    }

    editCourseAssignmentSuccess(){
        this.emit("edit course assignment success");
    }

    editCourseAssignmentError(){
        this.emit("edit course assignment error");
    }

    handleActions(action) {
        switch(action.type) {
            case "LOADED_COURSE_ASSIGNMENTS": {
                this.loadCourseAssignments(action);
                break;
            }
            case "NEW_COURSE_ASSIGNMENT_SUCCESS": {
                this.newCourseAssignmentSuccess(action);
                break;
            }
            case "NEW_COURSE_ASSIGNMENT_ERROR": {
                this.newCourseAssignmentError(action);
                break;
            }
            case "EDIT_COURSE_ASSIGNMENT_SUCCESS": {
                this.editCourseAssignmentSuccess(action);
                break;
            }
            case "EDIT_COURSE_ASSIGNMENT_ERROR": {
                this.editCourseAssignmentError(action);
                break;
            }
        }
    }

}

const courseAssignmentStore = new CourseAssignmentStore();
dispatcher.register(courseAssignmentStore.handleActions.bind(courseAssignmentStore));

export default courseAssignmentStore;