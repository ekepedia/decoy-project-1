module.exports = function (connection) {
    connection.schema.createTable('faculty_time_restriction', function (table) {

        table.string('faculty_id').notNullable();

        table.integer('start_time').notNullable();
        table.integer('end_time').notNullable();
        table.string('day_of_week').notNullable();

    }).then(function () {
        console.log("Created faculty time restriction table");
    }).catch(function () {
        console.log("Did not create faculty time restriction table");
    });

};