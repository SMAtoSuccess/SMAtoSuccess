const router = require('express').Router();
const { User, List, Item } = require("../../models");

const listRoutes = require("./list");
router.use('/list', listRoutes);

const userRoutes = require('./user')
router.use('/user', userRoutes);

const itemRoutes = require('./item-routes')
router.use('/item', itemRoutes);

module.exports = router;