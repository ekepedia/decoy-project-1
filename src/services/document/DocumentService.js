const _   = require("lodash");
const fs  = require('fs');
const aws = require('aws-sdk');

let init = false;
let knex = null;

const uuidv4 = require('uuid/v4');

module.exports.init = function (connection) {
    init = true;
    knex = connection;

    console.log("SQL: Document Successfully Initialized");
};

module.exports.create_document = create_document;


function create_document({uploader_id, faculty_id, course_id, is_public, comments, name, document_location}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!uploader_id || !document_location || !name || !(faculty_id || course_id))
        return callback(new Error("missing fields on new course creation"));

    knex("documents").insert({
        uploader_id,
        faculty_id,
        course_id,
        is_public,
        comments,
        name,
        document_location
    }).then(function () {
        return callback(null);
    });
}

module.exports.get_document = get_document;

function get_document({document_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!document_id)
        return callback(null, null);

    const query = {document_id};

    knex("documents").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows[0]);
    });
}

module.exports.get_documents = get_documents;

function get_documents({course_id, faculty_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!course_id && !faculty_id)
        return callback(null, null);

    const query = faculty_id ? faculty_id : course_id;

    knex("documents").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(null, null);
        }
        return callback(null, rows);
    });
}

module.exports.delete_document = delete_document;

function delete_document({document_id}, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    if (!document_id)
        return callback(null, null);

    const query = {document_id};

    knex("documents").where(query).then(function (rows) {
        if (!rows || rows.length === 0) {
            return callback(new Error("Document was not found with query: " + JSON.stringify(query)));
        }

        knex("documents").where(query).del().then(function () {
            return callback(null);
        });
    });
}

module.exports.upload_document = upload_document;

function upload_document(file, callback) {

    callback = (typeof callback === 'function') ? callback : function() {};

    fs.readFile(file.path, function (err, data) {

        const params = {
            Bucket: "wrapmit",
            Key: "public/" + uuidv4(),
            ContentType: file.mimetype,
            Body: data,
            ACL: 'public-read'
        };

        const s3 = new aws.S3();

        s3.upload(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
                return callback( new Error("Error on s3 upload"));
            } else {

                const photo_url = pres.Location;
                console.log("Successfully uploaded data", photo_url);

                callback(null, photo_url);
            }
        });

    });

}