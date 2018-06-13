module.exports = function (connection) {
    connection.schema.createTable('document_tag', function (table) {

        table.string('document_id').notNullable();
        table.string('tag').notNullable();
        table.string('type').notNullable();

    }).then(function () {
        console.log("Created documents tag table");
    }).catch(function () {
        console.log("Did not create documents tag table");
    });
};