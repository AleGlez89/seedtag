const {httpError} = require ('../helpers/controlErrors.js')
const LogsSchema = require ('../models/logs')

const getLogs = async (req, res) => {
    try {
        const listAll = await LogsSchema.find({})       
        res.send({ count: listAll.length, items: listAll })
    } catch (e) {
        httpError(res, e)
    }
}
const deleteLogs = async (req, res) => {
    try {
        const listAll = await LogsSchema.deleteMany({})
        res.status(200).end()
    } catch (e) {
        httpError(res, e)
    }
}
module.exports = {getLogs, deleteLogs}