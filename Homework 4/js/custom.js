function rgb(r, g, b) {
    var result = `rgb(${ r }, ${ g }, ${ b })`;
    return result
}

var funcResult = rgb(32, 4, 67)
console.log(funcResult)

function words(n = 0) {
    if (n === 0 || n >= 5) {
        correctWord = 'товаров'
    } else if (n === 1) {
        correctWord = 'товар'
    } else {
        correctWord = 'товара'
    }
    var result = `${n} ${correctWord}`;
    return result
}

var funcResult2 = words()
console.log(funcResult2)
