let init = false;
let knex = null;
let _    = require("lodash");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: Faculty Successfully Initialized");
};

module.exports.create_faculty = create_faculty;

function create_faculty({name, campus_address, campus_phone, kerberos, mit_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!name || !kerberos)
        return callback(new Error("missing fields on new faculty creation"));

    mit_id = parseInt(mit_id);
    mit_id = mit_id ? mit_id : null;

    knex("faculty").where({kerberos}).then(function (rows) {

        if (rows && rows.length !== 0) {
            return callback(new Error("duplicate faculty entry on kerberos"));
        }

        knex("faculty").insert({name, campus_address, campus_phone, kerberos, mit_id}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.edit_faculty = edit_faculty;

function edit_faculty({faculty_id, name, campus_address, campus_phone, kerberos, mit_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!faculty_id)
        return callback(new Error("missing fields on edit faculty"));

    mit_id = parseInt(mit_id);
    mit_id = mit_id ? mit_id : null;

    knex("faculty").where({faculty_id}).then(function (rows) {

        knex("faculty").where({faculty_id}).update({name, campus_address, campus_phone, kerberos, mit_id}).then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}

module.exports.get_faculty = get_faculty;

function get_faculty({faculty_id, kerberos}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!faculty_id && !kerberos)
        return callback(null, null);

    const query = faculty_id ? {faculty_id} : {kerberos};

    knex("faculty").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows[0]);
    });
}

module.exports.get_faculties = get_faculties;

function get_faculties(callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    knex("faculty").where({}).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows);
    });
}

module.exports.delete_faculty = delete_faculty;

function delete_faculty({faculty_id, kerberos}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!faculty_id && !kerberos)
        return callback(null, null);

    const query = faculty_id ? {faculty_id} : {kerberos};

    knex("faculty").where(query).then(function (rows) {

        if (!rows || rows.length === 0) {
            return callback(new Error("Faculty was not found with query: " + JSON.stringify(query)));
        }

        knex("faculty").where(query).del().then(function () {
            return callback(null);
        }).catch(function(err) {
            return callback(err);
        });
    });
}
