exports.up = function(knex, Promise) {
    return knex.schema.createTable('code_names', (table) => {
        table.increments();
        table.string('code_name');
        table.integer('assassins_id').references('id').inTable('assassins').onDelete('CASCADE').index();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('code_names')
};