// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')
const { validateProjectId } = require('../projects/projects-middleware')
const { validateActions, validateActionsId } = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => next({}))
})

router.get('/:id', validateActionsId, (req, res, next) => {
    res.status(200).json(req.action)
})

router.post('/', validateActions, (req, res) => {
    Actions.insert(req.newAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch((err) => {
            res.status(404).json({ message: 'Project not found, please enter correct project Id'})
        })
})

router.put('/:id', validateActionsId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.newAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => next({}))
})

router.delete('/:id', validateActionsId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(() => next({}))
})



module.exports = router