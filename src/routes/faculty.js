const _ = require('underscore');

const FacultyService = require("../services/faculty/FacultyService");
const Errors         = require("../helpers/Errors");

module.exports = function (app) {

    app.post("/api/faculty", function (req, res) {

        const {name, campus_address, campus_phone, kerberos, mit_id} = req.body;

        FacultyService.create_faculty({name, campus_address, campus_phone, kerberos, mit_id}, function (err) {
            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });
    });

    app.get("/api/faculty", function (req, res) {
        if (req.query && (req.query.faculty_id || req.query.kerberos)) {
            return FacultyService.get_faculty(req.query, function (err, data) {
                return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
            });
        }

        return FacultyService.get_faculties(function (err, data) {
            return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
        });
    });

    app.patch("/api/faculty", function (req, res) {

        const {faculty_id, name, campus_address, campus_phone, kerberos, mit_id} = req.body;

        FacultyService.edit_faculty({faculty_id, name, campus_address, campus_phone, kerberos, mit_id}, function (err) {
            if (err)
                return Errors.RESPOND_WITH_ERROR(res, err);

            return Errors.RESPOND_WITH_SUCCESS(res);
        });
    });
};