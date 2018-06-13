module.exports = function (connection) {
    connection.schema.createTable('course_preferences', function (table) {

        table.increments("course_preference_id");

        table.integer('faculty_id').notNullable();
        table.integer('course_id').notNullable();
        table.integer('year').notNullable();
        table.string('term').notNullable();

    }).then(function () {
        console.log("Created course preferences table");
    }).catch(function () {
        console.log("Did not create course preferences table");
    });
};