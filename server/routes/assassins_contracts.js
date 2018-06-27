'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/assassins_contracts', (req, res, next) => {
    knex('assassins_contracts')
        .orderBy('id')
        .then((assassins_contracts) => {
            res.send(assassins_contracts);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/assassins_contracts/:id', (req, res, next) => {
    knex('assassins_contracts')
        .where('id', req.params.id)
        .first()
        .then((assassins_contracts) => {
            if (!assassins_contracts) {
                return next();
            }
            res.send(assassins_contracts);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/assassins_contracts', (req, res, next) => {
    knex('assassins_contracts')
        .insert({
            assassins_id: req.body.assassins_id,
            contracts_id: req.body.contracts_id
        }, '*')
        .then((assassins_contracts) => {
            res.send(assassins_contracts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/assassins_contracts/:id', (req, res, next) => {
    knex('assassins_contracts')
        .where('id', req.params.id)
        .first()
        .then((assassins_contract) => {
            if (!assassins_contract) {
                return next();
            }

            return knex('assassins_contracts')
                .update({
                    assassins_id: req.body.assassins_id,
                    contracts_id: req.body.contracts_id
                }, '*')
                .where('id', req.params.id);
        })
        .then((assassins_contracts) => {
            res.send(assassins_contracts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/assassins_contracts/:id', (req, res, next) => {
    let assassins_contract;

    knex('assassins_contracts')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            assassins_contract = row;

            return knex('assassins_contracts')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete assassins_contract.id;
            res.send(assassins_contract);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;