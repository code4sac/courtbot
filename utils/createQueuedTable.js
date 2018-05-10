// Creates the reminders table.
var dotenv = require('dotenv').config()

console.log("CONNECT", process.env.HEROKU_POSTGRESQL_NAVY_URL);
var knex = require('knex')({
  client: 'pg',
  connection: process.env.HEROKU_POSTGRESQL_NAVY_URL
});

var createTable = function() {
  return knex.schema.createTable('queued', function(table) {
    table.increments('queued_id').primary();
    table.dateTime('created_at');
    table.string('citation_id', 100);
    table.string('phone', 100);
    table.boolean('sent', 100);
  });
};

var close = function() {
  return knex.client.pool.destroy();
};

createTable()
  .then(close)
  .then(function() {
    console.log('Queued table created.');
  });
