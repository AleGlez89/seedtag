const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateScan = [
    check('protocols')
        .exists()
        .not()
        .isEmpty()
        .isArray(),
    check('scan')
        .exists()
        .not()
        .isEmpty()
        .isArray()
    ,    
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateScan }