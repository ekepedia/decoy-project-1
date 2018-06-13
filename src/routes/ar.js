const _ = require('underscore');
const FormService = require("../services/form/FormService");

module.exports = function (app) {

    app.post("/api/ar/", function (req, res) {

        const { user_id, form_id, question_id, parent_id, response } = req.body;

        FormService.create_form_response({ user_id, form_id, question_id, parent_id, response }, function (err) {
            res.json({
                success: !err,
                error:    err
            });
        });
    });

};