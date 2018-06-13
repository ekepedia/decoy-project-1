const _ = require('underscore');
const AuthService = require("../services/auth/AuthService");

module.exports = function (app) {

    app.post("/api/auth/login", function (req, res) {

        const {email, password} = req.body;

        AuthService.login({email, password}, function (err, data) {
            res.json({
                success: !err,
                error:    err,
                data:     data
            });
        });
    });

    app.post("/api/auth/sign-up", function (req, res) {

        const {name, email, password} = req.body;

        AuthService.register({name, email, password}, function (err) {
            res.json({
                success: !err,
                error:    err
            });
        });
    });
};