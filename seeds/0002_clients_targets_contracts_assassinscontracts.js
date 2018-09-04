
exports.seed = function (knex, Promise) {
    return Promise.all([knex('clients').del(), knex('targets').del(), knex('contracts').del(), knex('assassins_contracts').del()])
      .then(function () {
        console.log('4 deletions are complete.');
        //Inserts seed entries
        return knex('clients').insert([{
              name: 'Marcellus Wallace'
            },
            {
              name: 'Concerto'
            },
            {
              name: 'Mathilda'
            }, 
            {
              name: 'Winston'
            },
            {
              name: 'Ray Vargo'
            },
          ])
          .then(function () {
            console.log('Targets have been populated.');
            return knex('targets').insert([{
                name: 'Butch Coolidge',
                location: 'Los Angeles',
                security_level: 3,
                target_photo:'https://goo.gl/LCquZj'
              },
              {
                name: 'The Jaguar',
                location: 'Russian Embassy',
                security_level: 9,
                target_photo:'https://goo.gl/6JWsiv'
              },
              {
                name: 'Norman Stansfield',
                location: 'Manhattan',
                security_level: 7,
                target_photo:'https://i.imgur.com/mdIk33E.jpg'
              },
              {
                name: "Santino D'Antonio",
                location: 'Continental Hotel',
                security_level: 10,
                target_photo:'https://goo.gl/fUPkYy'
              },
              {
                name: 'Sonny Valerio',
                location: 'Queens',
                security_level: 4,
                target_photo:'https://goo.gl/8DHYUS'
              }
            ])
          })
          .then(function () {
            console.log('contracts have been populated.');
            return knex('contracts').insert([{
                target_name_id: 1,
                client_id: 1,
                budget: 40
              },
              {
                target_name_id: 2,
                client_id: 2,
                budget: 70
              },
              {
                target_name_id: 3,
                client_id: 3,
                budget: 35
              },
              {
                target_name_id: 4,
                client_id: 4,
                budget: 25
              },
              {
                target_name_id: 5,
                client_id: 5,
                budget: 10
              },
            ])
          })
          .then(function () {
            console.log('assassins_contracts have been populated.');
            return knex('assassins_contracts').insert([{
                assassins_id: 6,
                contracts_id: 1
              },
              {
                assassins_id: 1,
                contracts_id: 2
              },
              {
                assassins_id: 5,
                contracts_id: 2
              },
              {
                assassins_id: 7,
                contracts_id: 3
              },
              {
                assassins_id: 9,
                contracts_id: 5
              },
              {
                assassins_id: 6,
                contracts_id: 5
              },
              {
                assassins_id: 8,
                contracts_id: 3
              },
              {
                assassins_id: 3,
                contracts_id: 1
              }
            ])
          })
      })
  };