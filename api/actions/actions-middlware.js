// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next) {
    let id = req.params.id;
    let action = await Actions.get(id)
    if(action == null){
        res.status(404).json({ message: "Action with specified id does not exsit"})
        return;
    }
    req.action = action
    next()
}

function validateActions(req, res, next) {
    if(typeof req.body.notes!== 'string' || 
    req.body.notes.trim() === "" || 
    typeof req.body.description !== 'string' || 
    req.body.description.trim() === "" ||
    typeof req.body.project_id !== 'number'){
        res.status(400).json({ message: "Enter notes, description, and project Id of action"})
            return;
    }
    req.newAction = {project_id: req.body.project_id, description: req.body.description, notes: req.body.notes, completed: req.body.completed}
    next()
}

module.exports = {
    validateActions,
    validateActionsId
}