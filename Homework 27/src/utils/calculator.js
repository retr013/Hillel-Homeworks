function add(num1, num2) {
    add_func = require('./add')
    return add_func.add(num1, num2)
}

function sub(num1, num2) {
    add_func = require('./sub')
    return add_func.sub(num1, num2)
}

function mult(num1, num2) {
    add_func = require('./mult')
    return add_func.mult(num1, num2)
}

function div(num1, num2) {
    add_func = require('./div')
    return add_func.div(num1, num2)
}

module.exports = {add: add,
    sub: sub,
    mult: mult,
    div: div
}