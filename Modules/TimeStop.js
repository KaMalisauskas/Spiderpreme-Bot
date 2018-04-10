
module.exports = exports = (time) => {
    return new Promise( (resolve) => {
        setTimeout( () => resolve(), time)
    })
}