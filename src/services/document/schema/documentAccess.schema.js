module.exports = function (connection) {
    connection.schema.createTable('document_access', function (table) {

        table.string('document_id').notNullable();
        table.string('person_id').notNullable();
        table.string('expiration_date').notNullable();

    }).then(function () {
        console.log("Created documents access table");
    }).catch(function () {
        console.log("Did not create documents access table");
    });
};