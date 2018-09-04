// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/killbase'
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: `postgres://abiwzeoblheeuu:adcbf127bdd5672fa8cf705fe8debee71a19527671df05bdbbf591e1d37eecfc@ec2-50-17-194-129.compute-1.amazonaws.com:5432/d3jqv3n3fs03e8`
  }
};