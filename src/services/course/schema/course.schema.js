module.exports = function (connection) {
    connection.schema.createTable('courses', function (table) {

        table.increments("course_id");

        table.string('name');
        table.string('course_number');
        table.string('units');
        table.text('description');
        table.text('wrap_description');

        table.boolean("featured");

    }).then(function () {
        console.log("Created courses table");
    }).catch(function () {
        console.log("Did not create courses table");
    });
};