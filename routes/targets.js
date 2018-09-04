'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/targets', (req, res, next) => {
    knex('targets')
        .orderBy('id')
        .then((targets) => {
            res.send(targets);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/targets/:id', (req, res, next) => {
    knex('targets')
        .where('id', req.params.id)
        .first()
        .then((targets) => {
            if (!targets) {
                return next();
            }
            res.send(targets);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/targets', (req, res, next) => {
    knex('targets')
        .insert({
            name: req.body.name,
            location: req.body.location,
            security_level: req.body.security_level,
            target_photo: req.body.target_photo
        }, '*')
        .then((targets) => {
            res.send(targets[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.patch('/targets/:id', (req, res, next) => {
    knex('targets')
        .where('id', req.params.id)
        .first()
        .then((target) => {
            if (!target) {
                return next();
            }

            return knex('targets')
                .update({
                    name: req.body.name,
                    location: req.body.location,
                    security_level: req.body.security_level,
                    target_photo: req.body.target_photo
                }, '*')
                .where('id', req.params.id);
        })
        .then((targets) => {
            res.send(targets[0]);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/targets/:id', (req, res, next) => {
    let target;

    knex('targets')
        .where('id', req.params.id)
        .first()
        .then((row) => {
            if (!row) {
                return next();
            }

            target = row;

            return knex('targets')
                .del()
                .where('id', req.params.id);
        })
        .then(() => {
            delete target.id;
            res.send(target);
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;