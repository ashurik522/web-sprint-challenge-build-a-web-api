// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')
const { validateProjectId, validateProject } = require('./projects-middleware')

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





module.exports = router;