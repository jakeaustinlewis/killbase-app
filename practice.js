exports.sees = function (knex, Promise) {
    //Deletes All existing entries

    //Promise all to delete everything from BOTH the dogs and breeds table at the SAME time.
    // When both actions are done, out .then is triggered.
    return Promise.all([knex('dogs').del(), knex('breeds').del()])
        .then(function () {
            console.log('Both deletions are complete.');
            //Inserts seed entries
            return knex('dogs').insert([{
                        name: 'Fido',
                        age: 13
                    },
                    {
                        name: 'Spike',
                        age: 20
                    },
                    {
                        name: 'Lab',
                        age: 5
                    }
                ])
                .then(function () {
                    console.log('Dogs have been populated.');
                    return knex('breeds').insert([{
                            breedname: 'corgi'
                        },
                        {
                            breedname: 'beagle'
                        },
                        {
                            breedname: 'husky'
                        },
                        {
                            breedname: 'irish wolf hound'
                        },
                        {
                            breedname: 'springer spaniel'
                        },
                        {
                            breedname: 'dachshund'
                        },
                        {
                            breedname: 'labrador'
                        }
                    ])
                })
        })
};