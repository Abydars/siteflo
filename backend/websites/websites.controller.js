const express = require('express');
const router = express.Router();
const websiteService = require('./website.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    websiteService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    websiteService.getAll()
        .then(website => res.json(website))
        .catch(err => next(err));
}

function getById(req, res, next) {
    websiteService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    websiteService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    websiteService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
