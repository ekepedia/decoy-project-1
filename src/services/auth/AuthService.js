"use strict";

const jwt     = require("jsonwebtoken");
const async   = require("async");
//const bcrypt  = require("bcrypt");
const _       = require("lodash");

const UserService = require("../user/UserService");
const Errors       = require("../../helpers/Errors");

module.exports.register =function ({name, email, password}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if(!name || !email || !password)
        return callback(new Error("Missing fields on auth sign up"));

    email = email.toLowerCase().trim();

    if(!get_domain(email))
        return callback(new Error("Invalid email from user"));

    UserService.get_user({email}, function (err, user) {
        if(err)
            return callback(err);

        if(user)
            return callback(new Error("Duplicate sign up"));

        bcrypt.hash(password, 10, function(err, hash) {

            UserService.create_user({name, email, password: hash}, function (err) {
                return callback(err);
            });
        });
    })

};

module.exports.login = login;

function login ({email, password}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if(!email || !password)
        return callback(new Error("Missing fields on login"));

    email = email.toLowerCase().trim();

    UserService.get_user({email}, function (err, user) {
        if(err)
            return callback(err);

        if(!user)
            return callback(new Error("User does not exist"));

        bcrypt.compare(password, user.password, function(err, valid) {
            if(err)
                return callback(err);

            if(!valid)
                return callback(new Error("Wrong password"));

            jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
                expiresIn: "1000d",
                issuer: process.env.TOKEN_ISSUER
            }, function(err, token) {
                if(err)
                    return callback(err);

                return callback(null, {
                    user: user,
                    token: token
                });
            });

        });
    });


}

module.exports.valid_token = valid_token;

function valid_token (token, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if(!token)
        return callback(new Error("Missing fields on valid token"));

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload) {
        if(err)
            return callback(Errors.API_ERROR(err));

        if(!payload.id || !payload.iat || !payload.iss || payload.iss !== process.env.TOKEN_ISSUER)
            return callback(new Error("Invalid token"));

        UserService.get_user({id: payload.id}, function (err, user) {
            if(err)
                return callback(err);

            if(!user)
                return callback(new Error("User not found on valid token"));

            return callback(null, {
                user: user
            });
        });

    });
}

module.exports.valid_token_middleware =  function (req, res, next) {

    let auth = req.headers.authorization;

    if(!auth || typeof auth !== "string") {
        return Errors.RESPOND_WITH_ERROR(res, Errors.MISSING_AUTHORIZATION_HEADER());
    }

    auth = auth.split(" ");

    if(auth.length !== 2 || auth[0] !== "Bearer") {
        return Errors.RESPOND_WITH_ERROR(res, Errors.MALFORMED_AUTHORIZATION_HEADER());
    }

    let token = auth[1];

    valid_token(token, function (err, data) {
        if(err){
            if(err && err.error && err.error.message)
                err.error.message = "Authorization Error: " + err.error.message;

            return Errors.RESPOND_WITH_ERROR(res, err);
        }

        req.locals.user  = data.user;
        req.locals.token = token;

        return next();
    });
};

function get_domain(email) {
    email = email.trim();

    let at_sign = email.indexOf("@");

    if(at_sign === -1)
        return false;

    if (email.split(" ").length !== 1)
        return false;

    let domain = email.substring(++at_sign);

    return domain.indexOf(".") !== -1 ? domain : false;
}