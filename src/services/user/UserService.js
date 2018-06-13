let init = false;
let knex = null;
let _    = require("lodash");

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: User Successfully Initialized");
};

module.exports.create_user = create_user;

function create_user({name, email, password}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!name || !email || !password)
        return callback(new Error("missing fields on new user creation"));

    knex("users").where({email}).then(function (rows) {

        if (rows && rows.length !== 0) {
            return callback(new Error("duplicate user entry on email"));
        }

        knex("users").insert({name, email, password}).then(function () {
            return callback(null);
        });
    });
}

module.exports.get_user = get_user;

function get_user({id, email}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!id && !email)
        return callback(null, null);

    const query = id ? {id} : {email};

    knex("users").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows[0]);
    });
}

module.exports.delete_user = delete_user;

function delete_user({id, email}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!id && !email)
        return callback(null, null);

    const query = id ? {id} : {email};

    knex("users").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(new Error("User was not found user query: " + JSON.stringify(query)));
        }

        knex("users").where(query).del().then(function (rows) {
            return callback(null);
        });
    });
}
