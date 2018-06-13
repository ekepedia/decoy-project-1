module.exports = function (connection) {
    connection.schema.createTable('course_time', function (table) {

        table.integer('course_id').notNullable();
        table.integer('year').notNullable();
        table.string('term').notNullable();

        table.integer('start_time').notNullable();
        table.integer('end_time').notNullable();
        table.string('day_of_week').notNullable();

        table.string('type').notNullable();

    }).then(function () {
        console.log("Created course time table");
    }).catch(function () {
        console.log("Did not create course time table");
    });
};