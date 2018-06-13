module.exports = function (connection) {
    connection.schema.createTable('faculty_employment', function (table) {

        table.string('faculty_id').notNullable();

        table.integer('start_time').notNullable();
        table.integer('end_time').notNullable();

        table.integer('employment').notNullable();

    }).then(function () {
        console.log("Created faculty employment table");
    }).catch(function () {
        console.log("Did not create faculty employment table");
    });
};