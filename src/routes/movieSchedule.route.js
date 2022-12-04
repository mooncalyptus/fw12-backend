const {readAllMovieSchedule, createMovieSchedule, updateMovieSchedule,deleteMovieSchedule } = require('../controllers/movieSchedule.controller')

const movieScheduleRouters = require('express').Router()

movieScheduleRouters.get('/', readAllMovieSchedule)
movieScheduleRouters.post('/', createMovieSchedule)
movieScheduleRouters.patch('/:id', updateMovieSchedule)
movieScheduleRouters.delete('/:id', deleteMovieSchedule)
module.exports = movieScheduleRouters