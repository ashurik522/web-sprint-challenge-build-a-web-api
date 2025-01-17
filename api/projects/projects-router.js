// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateProjectId, validateProject, validateProjectEdit } = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
           res.status(200).json(projects)
        })
        .catch(() => next({}))
})

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject,  (req,res, next) => {
    Projects.insert(req.newProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => next({}))
})

router.put('/:id', validateProjectEdit, validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.newProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => next({}))
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(() => next({}))
})

router.get('/:id/actions', validateProjectId, (req,res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => next({}))
})


module.exports = router;