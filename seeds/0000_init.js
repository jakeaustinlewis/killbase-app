exports.seed = function (knex, Promise) {
  //Deletes All existing entries

  //Promise all to delete everything from BOTH the dogs and breeds table at the SAME time.
  // When both actions are done, out .then is triggered.
  return knex.migrate.rollback()
  // return Promise.all([knex('assassins').del()])
    .then(function () {
      console.log('Both deletions are complete.');
      return knex.migrate.latest();
    })
    .then(function () {
      //Inserts seed entries
      return knex('assassins').insert([{
            full_name: 'Alexander Duggan',
            weapon: 'Sniper rifle',
            contact_info: 'jackal@gmail.com',
            age: 31,
            price: 45,
            rating: 7.5,
            kills: 28
          },
          {
            full_name: 'Anton Chigurh',
            weapon: 'Pneumatic Bolt gun',
            contact_info: 'pneujackcity@gmail.com',
            age: 52,
            price: 40,
            rating: 9,
            kills: 72
          },
          {
            weapon: 'Pistol',
            contact_info: 'ghostdog@gmail.com',
            age: 28,
            price: 20,
            rating: 6.5,
            kills: 35
          }, 
          {
            full_name: 'Jason Bourne',
            weapon: 'Parkour',
            contact_info: 'jb@gmail.com',        
            age: 27,
            price: 25,
            rating: 7,
            kills: 48
          },
          {
            full_name: 'John Wick',
            weapon: 'Lots of guns',
            contact_info: 'babayaga@gmail.com',  
            age: 35,
            price: 50,
            rating: 9.5,
            kills: 433
          },
          {
            full_name: 'Jules Winnfield',
            weapon: 'Pistol',
            contact_info: 'bmf@gmail.com',  
            age: 26,
            price: 15,
            rating: 6.5,
            kills: 13
          },
          {
            full_name: 'Leon',
            weapon: 'Everything',
            contact_info: 'leon@gmail.com',  
            age: 41,
            price: 30,
            rating: 8.5,
            kills: 87
          },
          {
            full_name: 'Nikita Mears',
            weapon: 'Silenced pistols',
            contact_info: 'nikita@gmail.com',  
            age: 28,
            price: 30,
            rating: 7,
            kills: 32
          },
          {
            full_name: 'Pickle Rick',
            weapon: 'Lasers and office supplies',
            contact_info: 'rsanchez@gmail.com', 
            age: 60,
            price: 0,
            rating: 7,
            kills: 32
          },
        ])
      })
};