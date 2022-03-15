const httpError = (res, err )=> {
    if(err.name === 'CastError'){
        res.status(400).end()
    } else {
        res.status(500).send({error: 'Algo ha salido mal'}).end()
    }   
}
module.exports = {httpError}