module.exports = function (connection) {
    connection.schema.createTable('form_assignment', function (table) {

        table.string('form_id').notNullable();
        table.string('faculty_id').notNullable();
        table.string('completion_date').notNullable();

    }).then(function () {
        console.log("Created form assignment table");
    }).catch(function () {
        console.log("Did not form assignment table");
    });
};