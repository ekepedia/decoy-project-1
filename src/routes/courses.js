const _ = require('underscore');

const CourseService             = require("../services/course/CourseService");
const CourseAssignmentsService  = require("../services/course/CourseAssignmentsService");
const CoursePreferencesService  = require("../services/course/CoursePreferencesService");

const Errors        = require("../helpers/Errors");

module.exports = function (app) {

    app.post("/api/courses", function (req, res) {

        const {name, course_number, units, description, wrap_description, featured} = req.body;

        CourseService.create_course({name, course_number, units, description, wrap_description, featured} , function (err, data) {

            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });
    });

    app.get("/api/courses", function (req, res) {
        if (req.query && req.query.course_id && req.query.course_number) {
            return CourseService.get_course(req.query, function (err, data) {
                return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
            });
        }

        return CourseService.get_courses(function (err, data) {
            return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
        });
    });

    app.patch("/api/courses", function (req, res) {

        const {course_id, name, course_number, units, description, wrap_description, featured} = req.body;

        CourseService.edit_course({course_id, name, course_number, units, description, wrap_description, featured}, function (err) {
            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });

    });

    // ASSIGNMENTS

    app.post("/api/courses/assignments", function (req, res) {

        const {course_id, faculty_id, year, term, team_lead} = req.body;

        CourseAssignmentsService.create_course_assignment({course_id, faculty_id, year, term, team_lead} , function (err) {

            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });
    });

    app.get("/api/courses/assignments", function (req, res) {

        const {course_id, faculty_id, year, term} = req.body;

        return CourseAssignmentsService.get_course_assignments({course_id, faculty_id, year, term}, function (err, data) {
            return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
        });

    });

    app.patch("/api/courses/assignments", function (req, res) {

        const {course_assignment_id, course_id, faculty_id, year, term, team_lead} = req.body;

        CourseAssignmentsService.edit_course_assignment({course_assignment_id, course_id, faculty_id, year, term, team_lead}, function (err) {
            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });

    });

    // PREFERENCES

    app.post("/api/courses/preferences", function (req, res) {

        const {course_id, faculty_id, year, term} = req.body;

        CoursePreferencesService.create_course_preference({course_id, faculty_id, year, term} , function (err) {

            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });
    });

    app.get("/api/courses/preferences", function (req, res) {

        const {course_id, faculty_id, year, term} = req.body;

        return CoursePreferencesService.get_course_preferences({course_id, faculty_id, year, term}, function (err, data) {
            return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
        });

    });

    app.patch("/api/courses/preferences", function (req, res) {

        const {course_preference_id, course_id, faculty_id, year, term} = req.body;

        CoursePreferencesService.edit_course_preference({course_preference_id, course_id, faculty_id, year, term}, function (err) {
            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });

    });

};