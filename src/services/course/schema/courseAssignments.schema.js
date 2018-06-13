module.exports = function (connection) {
    connection.schema.createTable('course_assignments', function (table) {

        table.increments("course_assignment_id");

        table.integer('faculty_id').notNullable();
        table.integer('course_id').notNullable();
        table.integer('year').notNullable();
        table.string('term').notNullable();

        table.boolean("team_lead");

    }).then(function () {
        console.log("Created course assignments table");
    }).catch(function () {
        console.log("Did not create course assignments table");
    });
};