exports.up = function (knex, Promise) {
    return knex.schema.createTable('clients', (table) => {
            table.increments();
            table.string('name');
        })
        .then(function () {
            return knex.schema.createTable('targets', function (table) {
                table.increments();
                table.text('name');
                table.text('location');
                table.integer('security_level');
                table.text('target_photo');
            })
        })
        .then(function () {
            return knex.schema.createTable('contracts', function (table) {
                table.increments();
                table.integer('target_name_id').references('id').inTable('targets').onDelete('CASCADE').index();
                table.integer('client_id').references('id').inTable('clients').onDelete('CASCADE').index();
                table.integer('budget');
            })
        })
        .then(function () {
            return knex.schema.createTable('assassins_contracts', function (table) {
                table.increments();
                table.integer('assassins_id').references('id').inTable('assassins').onDelete('CASCADE').index();
                table.integer('contracts_id').references('id').inTable('contracts').onDelete('CASCADE').index();
            })
        })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('assassins_contracts')
        .then(function () {
            return knex.schema.dropTable('contracts');
        })
        .then(function () {
            return knex.schema.dropTable('targets');
        })
        .then(function () {
            return knex.schema.dropTable('clients');
        })
};