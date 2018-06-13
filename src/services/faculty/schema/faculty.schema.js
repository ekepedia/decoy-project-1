module.exports = function (connection) {
    connection.schema.createTable('faculty', function (table) {

        table.increments("faculty_id");

        table.string('name').notNullable();
        table.text('campus_address');
        table.string('campus_phone');
        table.string('kerberos').unique().notNullable();
        table.integer('mit_id').unique();

    }).then(function () {
        console.log("Created faculty table");
    }).catch(function () {
        console.log("Did not create faculty table");
    });

};