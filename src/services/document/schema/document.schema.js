module.exports = function (connection) {
    connection.schema.createTable('documents', function (table) {

        table.increments("document_id");
        table.timestamps(true, true);

        table.string('name').notNullable();
        table.string('uploader_id').notNullable();
        table.string('document_location').notNullable();

        table.string('faculty_id');
        table.string('course_id');

        table.boolean('is_public');
        table.text('comments');

    }).then(function () {
        console.log("Created documents table");
    }).catch(function () {
        console.log("Did not create documents table");
    });
};