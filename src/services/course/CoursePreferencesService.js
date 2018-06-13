let init = false;
let knex = null;
let _    = require("lodash");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: Course Successfully Initialized");
};

module.exports.create_course_preference = create_course_preference;

function create_course_preference({course_id, faculty_id, year, term}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_id || !faculty_id || !year || !term)
        return callback(new Error("missing fields on new course creation"));

    term = clean_term(term);
    year = clean_year(year);

    knex("course_preferences").where({course_id, faculty_id, year, term}).then(function (rows) {

        if (rows && rows.length !== 0) {
            return callback(new Error("duplicate course entry on course number"));
        }

        knex("course_preferences").insert({course_id, faculty_id, year, term}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.edit_course_preference = edit_course_preference;

function edit_course_preference({course_preference_id, course_id, faculty_id, year, term}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_preference_id)
        return callback(new Error("missing fields on edit course"));

    term = clean_term(term);
    year = clean_year(year);

    knex("course_preferences").where({course_preference_id}).then(function (rows) {

        if (!rows || rows.length === 0) {
            return callback(new Error("Course was not found with query: " + JSON.stringify({course_preference_id})));
        }

        knex("course_preferences").where({course_preference_id}).update({course_id, faculty_id, year, term}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.get_course_preferences = get_course_preferences;

function get_course_preferences({course_id, faculty_id, year, term}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    let query = {};

    if (course_id)  query.course_id  = course_id;
    if (faculty_id) query.faculty_id = faculty_id;
    if (year)       query.year       = year;
    if (term)       query.term       = term;

    knex("course_preferences").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows);
    });
}


module.exports.delete_course_preference = delete_course_preference;

function delete_course_preference({course_preference_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_preference_id)
        return callback(null, null);

    const query = {course_preference_id};

    knex("course_preferences").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(new Error("Course was not found with query: " + JSON.stringify(query)));
        }

        knex("course_preferences").where(query).del().then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

function clean_term(term) {

    if(!term)
        return term;

    if (["F","I","S"].indexOf(term) === -1)
        return "S";

    return term;
}

function clean_year(year) {

    if(!year)
        return year;

    if (String(year).length !== 4)
        return new Date().getFullYear();

    return year;
}