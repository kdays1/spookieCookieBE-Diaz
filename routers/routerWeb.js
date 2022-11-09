const express = require('express');
const {controladorGetForm } = require('../controllers/controllerWeb.js')

const routerWeb = express.Router()

routerWeb.get('/', controladorGetForm)

exports.routerWeb = routerWeb;