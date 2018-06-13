module.exports = function (connection) {
    connection.schema.createTable('form', function (table) {

        table.increments("form_id");

        table.string('deadline').notNullable();
        table.string('name').notNullable();
        table.integer('year').notNullable();
        table.string('term').notNullable();

    }).then(function () {
        console.log("Created form table");
    }).catch(function () {
        console.log("Did not form table");
    });
};