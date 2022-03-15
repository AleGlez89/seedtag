const express = require('express')
const router = express.Router()
const {createScans} = require('../controller/scans')
const checkRequest = require('../middleWar/controlRequest_radar')
const { validateScan } = require('../validators/scans')

router.post('/',checkRequest, validateScan, createScans)

module.exports = router