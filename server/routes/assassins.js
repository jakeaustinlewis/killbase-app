'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');
const path = require('path');


router.get('/listAssassins', (req, res, next) => {
    let assassinsFile = path.join(__dirname, '..', '..', 'public', 'assassins.html');
    res.sendFile(assassinsFile);
});

router.get('/assassins', (req, res, next) => {
    knex('assassins')
    .select('full_name', 'weapon','contact_info', 'age','price', 'rating', 'kills', 'code_name')
    .innerJoin('code_names', 'assassins.id', 'code_names.assassins_id' )
        .orderBy('assassins.id')
        .then((assassins) => {
            res.send(assassins);
            console.log(assassins);
            // res.render('assassins', {data: assassins});
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/assassins/:id', (req, res, next) => {
    knex('assassins')
        .where('id', req.params.id)
        .first()
        .then((assassins) => {
            if (!assassins) {
                return next();
            }
            res.send(assassins);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/assassins', (req, res, next) => {
    console.log('POST assassins req body', req.body);
    knex('assassins')
        .insert({
            full_name: req.body.full_name,
            weapon: req.body.weapon,
            contact_info: req.body.contact_info,
            age: req.body.age,
            price: req.body.price,
            rating: req.body.rating,
            kills: req.body.kills
        }, '*')
        .then((assassins) => {
            // res.send(assassins[0]);
            let createdAssassin = assassins[0];
            return knex('code_names')
            .insert({
                assassins_id: createdAssassin.id,
                code_name: req.body.code_name
            }, '*')
            .then((code_names) => {
                res.send(createdAssassin);
            })
        })
        .catch((err) => {
            console.error('Creating a new assassin:', err);
            next(err);
        });
});

router.patch('/assassins/:id', (req, res, next) => {
    console.log('PATCH assassins req body', req.body);
    knex('assassins')
        .where('id', req.params.id)
        // .first()
        .then((assassin) => {
            if (!assassin) {
                return next();
            }

            return knex('assassins')
                .update({
                    full_name: req.body.full_name,
                    weapon: req.body.weapon,
                    contact_info: req.body.contact_info,
                    age: req.body.age,
                    price: req.body.price,
                    rating: req.body.rating,
                    kills: req.body.kills
                }, '*')
                .where('id', req.params.id);
        })
        .then((assassins) => {
            let editedAssassin = assassins[0];
            return knex('code_names')
                .update({
                    assassins_id: createdAssassin.id,
                    code_name: req.body.code_name
                })
            res.send(editedAssassin);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/assassins/:id', (req, res, next) => {
    let assassin;

    knex('assassins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            assassin = row;

            return knex('assassins')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete assassin.id;
            res.send(assassin);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;