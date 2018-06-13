import { EventEmitter } from "events";
import dispatcher       from "../dispatcher";
import _ from "lodash";

import * as FacultyActions from "../actions/FacultyActions";

class FacultyStore extends EventEmitter {

    constructor() {
        super();

        FacultyActions.reloadFaculty();
    }

    loadFaculty(action) {
        this.faculty = action.faculty;
        this.emit("faculty loaded");
    }

    getFaculty() {
        return this.faculty;
    }

    getFacultyOne(faculty_id) {
        return _.find(this.faculty, function(f) {
            return parseInt(f.faculty_id) === parseInt(faculty_id);
        });
    }

    newFacultySuccess(){
        this.emit("new faculty success");
    }

    newFacultyError(){
        this.emit("new faculty error");
    }

    editFacultySuccess(){
        this.emit("edit faculty success");
    }

    editFacultyError(){
        this.emit("edit faculty error");
    }

    handleActions(action) {
        switch(action.type) {
            case "LOADED_FACULTY": {
                this.loadFaculty(action);
                break;
            }
            case "NEW_FACULTY_SUCCESS": {
                this.newFacultySuccess(action);
                break;
            }
            case "NEW_FACULTY_ERROR": {
                this.newFacultyError(action);
                break;
            }
            case "EDIT_FACULTY_SUCCESS": {
                this.editFacultySuccess(action);
                break;
            }
            case "EDIT_FACULTY_ERROR": {
                this.editFacultyError(action);
                break;
            }
        }
    }
}

const facultyStore = new FacultyStore();
dispatcher.register(facultyStore.handleActions.bind(facultyStore));

export default facultyStore;