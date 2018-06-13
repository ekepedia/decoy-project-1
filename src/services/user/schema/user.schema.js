module.exports = function (connection) {
    connection.schema.createTable('users', function (table) {

        table.increments();

        table.string('password');
        table.string('name');
        table.string('email');

    }).then(function () {
        console.log("Created users table");
    }).catch(function () {
        console.log("Did not create users table");
    });
};