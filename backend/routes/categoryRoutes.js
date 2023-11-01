const express = require('express');

const router = express.Router();

const categoryValidations = require('../validations/categoryValidations');
const Authorization = require('../servicies/Authorization');
// const Category = require('../controllers/Category');
const Category = require('../controllers/Category');

router.post('/create-category', [categoryValidations, Authorization.authorized], Category.create);
router.get('/categories/:page', Authorization.authorized, Category.categories );

module.exports = router;