const express = require('express');
const router = express.Router();
const { createActivity, listActivities } = require('../controllers/activity.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares'); 
const {adminMiddleware} = require('../middlewares/role.middlewares')

router.post('/createActivity', authMiddleware, adminMiddleware,  createActivity);
router.get('/listActivities', listActivities);                   

module.exports = router;
