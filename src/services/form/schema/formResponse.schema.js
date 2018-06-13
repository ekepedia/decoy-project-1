module.exports = function (connection) {
    connection.schema.createTable('form_responses', function (table) {

        table.increments("response_id");

        table.string('form_id');
        table.string('question_id');
        table.string('parent_id');
        table.string('user_id');

        table.text('response');

    }).then(function () {
        console.log("Created form responses table");
    }).catch(function () {
        console.log("Did not form responses table");
    });
};