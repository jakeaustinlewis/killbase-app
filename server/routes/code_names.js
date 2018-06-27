'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/code_names', (req, res, next) => {
    knex('code_names')
        .orderBy('id')
        .then((code_names) => {
            res.send(code_names);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/code_names/:id', (req, res, next) => {
    knex('code_names')
        .where('id', req.params.id)
        .first()
        .then((code_names) => {
            if (!code_names) {
                return next();
            }
            res.send(code_names);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/code_names', (req, res, next) => {
    knex('code_names')
        .insert({
            code_name: req.body.code_name,
            assassins_id: assassins_id
        }, '*')
        .then((code_names) => {
            res.send(code_names[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/code_names/:id', (req, res, next) => {
    knex('code_names')
        .where('id', req.params.id)
        .first()
        .then((code_name) => {
            if (!code_name) {
                return next();
            }

            return knex('code_names')
                .update({
                    code_name: req.body.code_name,
                    assassins_id: assassins_id
                }, '*')
                .where('id', req.params.id);
        })
        .then((code_names) => {
            res.send(code_names[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/code_names/:id', (req, res, next) => {
    let code_name;

    knex('code_names')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            assassin = row;

            return knex('code_names')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete code_name.id;
            res.send(code_name);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;