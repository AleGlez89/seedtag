const {httpError} = require ('../helpers/controlErrors.js')
const checkRequest = (req, res, next) =>{
    try {
        if(req.headers.authorization){
            const seedtagToken = req.headers.authorization.split(' ').pop()      
            if(seedtagToken === 'seedtag_radar_123'){
                next()
            } else {
                res.status(503)
                res.send({error: 'Forbbiden'})
            }
        } else {
            res.status(400)
            res.send({error: 'Not exist token in header'})
        }       
    } catch (error) {
        httpError(res, error)
    } 
}
module.exports = checkRequest