"use strict";
let MySQLService = require("../services/MySQLService");

function connect() {

    let knex = require('knex')({
        client: 'pg',
        connection: process.env.POSTGRES_URL
    });

    knex.schema.hasTable('not_found_for_sure').then(function(exists) {
        if (!exists) {
            console.log("Database connected");
            MySQLService.init(knex);
        }
    });
}

connect();