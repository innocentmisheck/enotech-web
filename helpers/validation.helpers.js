Isset = (field, position = null) => {
    if (field == "0") {
        return true
    }
    if (position != null) {
        console.log('Empty at position %s with value %s', position, field)
    }

    return (field !== null && field !== typeof undefined && field !== '');
}


module.exports = { Isset }