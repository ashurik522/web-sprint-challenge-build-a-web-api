const express = require('express');
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.use((err, req, res, next) => {
    res.status(500).json({ message: 'internal server error'})
})


module.exports = server;
