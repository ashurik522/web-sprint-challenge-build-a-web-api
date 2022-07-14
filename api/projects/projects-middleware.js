// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    let id = req.params.id;
    let project = await Projects.get(id)
    if(project == null){
        res.status(404).json({ message: "Project with specified id does not exsit"})
        return;
    }
    req.project = project
    next()
}

function validateProject(req, res, next) {
    if(typeof req.body.name !== 'string' || 
        req.body.name.trim() === "" || 
        typeof req.body.description !== 'string' || 
        req.body.description.trim() === ""){
            res.status(400).json({ message: "Enter name and description of project"})
            return;
    }

    req.newProject = { name: req.body.name, description: req.body.description, completed: true}
    next()
}

module.exports = {
    validateProjectId,
    validateProject
}