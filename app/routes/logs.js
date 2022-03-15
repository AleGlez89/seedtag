const express = require('express')
const router = express.Router()
const {getLogs, deleteLogs} = require('../controller/logs')
const checkRequest = require('../middleWar/controlRequest_scan')

router.get('/',checkRequest, getLogs)
router.delete('/',checkRequest, deleteLogs)

module.exports = router