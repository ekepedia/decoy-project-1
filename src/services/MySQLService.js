"use strict";

let init = false;
let knex = null;
let _    = require("lodash");

const FormService              = require("./form/FormService");
const UserService              = require("./user/UserService");
const DocumentService          = require("./document/DocumentService");
const CourseService            = require("./course/CourseService");
const FacultyService           = require("./faculty/FacultyService");
const CourseAssignmentsService = require("./course/CourseAssignmentsService");
const CoursePreferencesService = require("./course/CoursePreferencesService");

const DocumentSchema           = require("../services/document/schema/document.schema");
const UserSchema               = require("../services/user/schema/user.schema");
const CourseSchema             = require("../services/course/schema/course.schema");
const FacultySchema            = require("../services/faculty/schema/faculty.schema");
const CourseAssignmentSchema   = require("../services/course/schema/courseAssignments.schema");
const CoursePreferenceSchema   = require("../services/course/schema/coursePreferences.schema");
const FormSchema               = require("../services/form/schema/formResponse.schema");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("MySQLService Successfully Initialized");

    initSchemas();
    initServices();
};

function initSchemas() {
    CourseSchema(knex);
    CourseAssignmentSchema(knex);
    CoursePreferenceSchema(knex);
    DocumentSchema(knex);
    FacultySchema(knex);
    FormSchema(knex);
    UserSchema(knex);
}

function initServices() {
    FormService.init(knex);
    UserService.init(knex);
    DocumentService.init(knex);
    CourseService.init(knex);
    FacultyService.init(knex);
    CourseAssignmentsService.init(knex);
    CoursePreferencesService.init(knex);
}