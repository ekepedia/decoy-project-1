module.exports = function (connection) {
    connection.schema.createTable('form_question', function (table) {

        table.increments("question_id");

        table.string('form_id').notNullable();
        table.string('faculty_id').notNullable();
        table.string('response_type').notNullable();
        table.string('options').notNullable();

    }).then(function () {
        console.log("Created form question table");
    }).catch(function () {
        console.log("Did not form question table");
    });
};