const express = require('express')
const router = express.Router()
const {getScans, getScan, deleteAllScans, deleteScans} = require('../controller/scans')
const checkRequest = require('../middleWar/controlRequest_scan')

router.get('/',checkRequest, getScans)
router.get('/:id',checkRequest, getScan)
router.delete('/all',checkRequest, deleteAllScans)
router.delete('/:id',checkRequest, deleteScans)

module.exports = router