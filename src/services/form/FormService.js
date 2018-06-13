let init = false;
let knex = null;
let _    = require("lodash");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: Form Successfully Initialized");
};

module.exports.create_form_response = create_form_response;

function create_form_response({form_id, question_id, user_id, parent_id, response}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!form_id || !question_id || !user_id || !response)
        return callback(new Error("missing fields on new form response creation"));

    knex("form_responses").insert({form_id, question_id, user_id, parent_id, response}).then(function () {
        return callback(null);
    });
}

module.exports.get_form_responses = get_form_responses;

function get_form_responses({form_id, user_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!form_id && !user_id)
        return callback(null, null);

    const query = user_id ? (form_id ? {user_id, form_id} : {user_id}) : {form_id};

    knex("form_responses").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows);
    });
}

module.exports.edit_form_response = edit_form_response;

function edit_form_response(response_id, {question_id, user_id, parent_id, response}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!response_id)
        return callback(new Error("missing response id on edit form response"));

    if (!question_id && !user_id && !parent_id && !response)
        return callback(new Error("empty update on edit form response"));

    knex("form_responses").where({response_id}).update({question_id, user_id, parent_id, response}).then(function () {
        return callback(null);
    });
}

module.exports.delete_form_response = delete_form_response;

function delete_form_response({response_id, form_id, user_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!response_id && !form_id)
        return callback(null, null);

    const query = form_id && user_id? {form_id, user_id} : {response_id};

    knex("form_responses").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(new Error("From repsonses was not found with query: " + JSON.stringify(query)));
        }

        knex("form_responses").where(query).del().then(function () {
            return callback(null);
        });
    });
}
