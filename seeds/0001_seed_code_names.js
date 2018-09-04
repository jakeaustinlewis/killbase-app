exports.seed = function (knex, Promise) {
  //Deletes All existing entries

  //Promise all to delete everything from BOTH the dogs and breeds table at the SAME time.
  // When both actions are done, out .then is triggered.
  return Promise.all([knex('code_names').del()])
    .then(function () {
      console.log('Code_Names deletion is complete.');
      //Inserts seed entries
      return knex('code_names').insert([{
            code_name: 'The Jackal',
            assassins_id: 1,
          },
          {
            code_name: 'Old Man',
            assassins_id: 2,
          },
          {
            code_name: 'Ghost Dog',
            assassins_id: 3,
          }, 
          {
            code_name: 'Baba Yoga',
            assassins_id: 5,
          },
          {
            code_name: 'The Professional',
            assassins_id: 7,
          },
          {
            code_name: 'Nikita, La Femme Nikita',
            assassins_id: 8,
          },
          {
            code_name: 'Solenya',
            assassins_id: 9,
          },
        ])
    })
};