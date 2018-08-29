'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/contracts', (req, res, next) => {
    knex('contracts')
    .select('targets.name as target_name', 'targets.location as target_location', 
        'targets.security_level as target_security_level', 'targets.target_photo as target_photo', 
        'contracts.budget as contract_budget', 
        'clients.name as client_name')
    .innerJoin('targets', 'contracts.target_name_id', 'targets.id')
    .innerJoin('clients', 'contracts.client_id', 'clients.id')
        .orderBy('contracts.id')
        .then((contracts) => {
            res.send(contracts);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/contracts/:id', (req, res, next) => {
    knex('contracts')
        .where('id', req.params.id)
        // .first()
        .then((contracts) => {
            if (!contracts) {
                return next();
            }
            res.send(contracts);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/contracts', (req, res, next) => {
    console.log('POST contracts request:', req.body)
    knex('contracts')
        .insert({
            budget: req.body.budget,
            client_id: req.body.client_id,
            target_name_id: req.body.target_name_id
        }, '*')
        .then((contracts) => {
            res.send(contracts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/contracts/:id', (req, res, next) => {
    knex('contracts')
        .where('id', req.params.id)
        .first()
        .then((contract) => {
            if (!contract) {
                return next();
            }

            return knex('contracts')
                .update({
                    budget: req.body.budget,
                    client_id: req.body.client_id,
                    target_name_id: req.body.target_name_id
                }, '*')
                .where('id', req.params.id);
        })
        .then((contracts) => {
            res.send(contracts[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/contracts/:id', (req, res, next) => {
    let contract;

    knex('contracts')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            } 

            contract = row;

            return knex('contracts')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete contract.id;
            res.send(contract);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;