"use strict";

var Errors = {};

// E40XX: Missing
Errors.MISSING_FIELDS = function () {
    return {
        error: new Error ("Missing fields; See GitHub Wiki for required fields"),
        error_code: "E4000",
        error_status: 400
    }
};

Errors.MISSING_AUTHORIZATION_HEADER = function () {
    return {
        error: new Error ("Missing auth header. See docs for proper authentication use"),
        error_code: "E4001",
        error_status: 403
    }
};

Errors.RESOURCE_NOT_FOUND = function () {
    return {
        error: new Error ("Resource does not exist"),
        error_code: "E4002",
        error_status: 404
    }
};

Errors.USER_NOT_FOUND = function () {
    return {
        error: new Error ("User does not exist"),
        error_code: "E4003",
        error_status: 404
    }
};

Errors.GROUP_NOT_FOUND = function () {
    return {
        error: new Error ("Group does not exist"),
        error_code: "E4004",
        error_status: 404
    }
};

Errors.USER_PASSWORD_NOT_SET = function () {
    return {
        error: new Error ("This user has not previously set a password"),
        error_code: "E4005",
        error_status: 403
    }
};

Errors.MISSING_SUBSCRIPTION_ID = function () {
    return {
        error: new Error ("Subscription id for this user does not exist"),
        error_code: "E4006",
        error_status: 404
    }
};

// E41XX: Invalid
Errors.MALFORMED_AUTHORIZATION_HEADER = function () {
    return {
        error: new Error ("Bad auth header. See docs for proper authentication use"),
        error_code: "E4100",
        error_status: 400
    }
};

Errors.DUPLICATE_ENTRY = function () {
    return {
        error: new Error ("Duplicate Entry; You are trying to add something to the database that has already been added"),
        error_code: "E4101",
        error_status: 403
    }
};

Errors.DUPLICATE_SIGN_UP = function () {
    return {
        error: new Error ("Duplicate Sign Up; You are trying sign up a user that has already signed up"),
        error_code: "E4102",
        error_status: 403
    }
};

Errors.WRONG_PASSWORD = function () {
    return {
        error: new Error ("Wrong password"),
        error_code: "E4103",
        error_status: 403
    }
};

Errors.INVALID_TOKEN_PAYLOAD = function () {
    return {
        error: new Error ("Invalid Token Payload"),
        error_code: "E4104",
        error_status: 400
    }
};

Errors.TOKEN_EXPIRED = function () {
    return {
        error: new Error ("Token Expired"),
        error_code: "E4105",
        error_status: 400
    }
};

Errors.INVALID_JSON_PAYLOAD = function () {
    return {
        error: new Error("Invalid JSON payload. Make sure it is formatted correctly"),
        error_code: "E4106",
        error_status: 400
    }
};

Errors.INVALID_FIELD_TYPE = function () {
    return {
        error: new Error("Invalid Field type. Check the wiki to make sure you are passing in the correct type for the field"),
        error_code: "E4107",
        error_status: 400
    }
};

Errors.DUPLICATE_USERNAME = function () {
    return {
        error: new Error("You're trying to set your username to someone else's"),
        error_code: "E4108",
        error_status: 400
    }
};

// E50XX
Errors.API_ERROR = function (err) {
    return {
        error: err,
        error_code: "E5000",
        error_status: 500
    }
};

Errors.SERVER_ERROR = function (err) {
    return {
        error: err,
        error_code: "E5001",
        error_status: 500
    }
};

Errors.DATABASE_NOT_INITIALIZED = function (err) {
    return {
        error: err,
        error_code: "E5002",
        error_status: 500
    }
};

Errors.RESPOND_WITH_ERROR = function (res, err) {
    if (!err.error) err = Errors.API_ERROR(err);

    return res.status(err.error_status).json({
        success: false,
        error: {
            message: err.error.toString(),
            code: err.error_code
        }
    });
};

Errors.RESPOND_WITH_SUCCESS = function (res) {
    return res.json({
        success: true,
        error: null
    });
};

Errors.RESPOND_WITH_SUCCESS_AND_DATA = function (res, data) {
    return res.json({
        success: true,
        error: null,
        data: data
    });
};

module.exports = Errors;