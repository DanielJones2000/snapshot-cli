const { resolve } = require('path')

function init() {
    console.log('111111', resolve('./'))
}

exports.module = init