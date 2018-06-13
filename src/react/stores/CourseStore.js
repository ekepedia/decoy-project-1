import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import _ from "lodash";

import * as CourseActions from "../actions/CourseActions";


class CourseStore extends EventEmitter {

    constructor() {
        super();

        CourseActions.reloadCourses();
    }

    loadCourses(action) {
        this.courses = action.courses;

        this.emit("courses loaded");
    }

    getCourses() {
        return this.courses;
    }

    getCourse(course_id) {
        return _.find(this.courses, function(c) {
            return parseInt(c.course_id) === parseInt(course_id);
        });
    }

    newCourseSuccess(){
        this.emit("new course success");
    }

    newCourseError(){
        this.emit("new course error");
    }

    editCourseSuccess(){
        this.emit("edit course success");
    }

    editCourseError(){
        this.emit("edit course error");
    }

    handleActions(action) {
        switch(action.type) {
            case "LOADED_COURSES": {
                this.loadCourses(action);
                break;
            }
            case "NEW_COURSE_SUCCESS": {
                this.newCourseSuccess(action);
                break;
            }
            case "NEW_COURSE_ERROR": {
                this.newCourseError(action);
                break;
            }
            case "EDIT_COURSE_SUCCESS": {
                this.editCourseSuccess(action);
                break;
            }
            case "EDIT_COURSE_ERROR": {
                this.editCourseError(action);
                break;
            }
        }
    }

}

const courseStore = new CourseStore();
dispatcher.register(courseStore.handleActions.bind(courseStore));

export default courseStore;