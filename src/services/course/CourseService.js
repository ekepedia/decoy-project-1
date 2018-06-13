let init = false;
let knex = null;
let _    = require("lodash");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: Course Successfully Initialized");
};

module.exports.create_course = create_course;

function create_course({name, course_number, units, description, wrap_description, featured}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!name || !course_number || !units)
        return callback(new Error("missing fields on new course creation"));

    knex("courses").where({course_number}).then(function (rows) {

        if (rows && rows.length !== 0) {
            return callback(new Error("duplicate course entry on course number"));
        }

        knex("courses").insert({name, course_number, units, description, wrap_description, featured}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.edit_course = edit_course;

function edit_course({course_id, name, course_number, units, description, wrap_description, featured}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_id)
        return callback(new Error("missing fields on edit course"));

    knex("courses").where({course_id}).then(function (rows) {

        knex("courses").where({course_id}).update({name, course_number, units, description, wrap_description, featured}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.get_course = get_course;

function get_course({course_id, course_number}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_id && !course_number)
        return callback(null, null);

    const query = course_id ? {course_id} : {course_number};

    knex("courses").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows[0]);
    });
}

module.exports.get_courses = get_courses;

function get_courses(callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    knex("courses").where({}).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows);
    });
}


module.exports.delete_course = delete_course;

function delete_course({course_id, course_number}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_id && !course_number)
        return callback(null, null);

    const query = course_id ? {course_id} : {course_number};

    knex("courses").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(new Error("Course was not found with query: " + JSON.stringify(query)));
        }

        knex("courses").where(query).del().then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}
