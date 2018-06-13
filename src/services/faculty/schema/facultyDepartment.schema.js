module.exports = function (connection) {
    connection.schema.createTable('faculty_department', function (table) {

        table.string('faculty_id').notNullable();
        table.string('departmnet').notNullable();

    }).then(function () {
        console.log("Created faculty department table");
    }).catch(function () {
        console.log("Did not create faculty department table");
    });

};