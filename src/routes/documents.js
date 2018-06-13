const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs     = require('fs');
const aws    = require('aws-sdk');
const _ = require('underscore');

const DocumentService = require("../services/document/DocumentService");
const Errors         = require("../helpers/Errors");

module.exports = function (app) {

    app.post("/api/documents", upload.single('file'), function (req, res) {

        if(req.file){
            DocumentService.upload_photo({file: req.file, mls_id: req.body.mls_id}, function (err) {
                if(err)
                    return Errors.RESPOND_WITH_ERROR(res, err);

                return Errors.RESPOND_WITH_SUCCESS(res);
            })
        } else {
            return Errors.RESPOND_WITH_ERROR(res, Errors.MISSING_FIELDS());
        }
    });

    app.get("/api/documents", function (req, res) {
        if (req.query && (req.query.document_id)) {
            return DocumentService.get_document(req.query, function (err, data) {
                return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
            });
        }

        return DocumentService.get_documents(req.query, function (err, data) {
            return Errors.RESPOND_WITH_SUCCESS_AND_DATA(res, data);
        });
    });

};