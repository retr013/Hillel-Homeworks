var firstNum = 1
var secondNum = 1
while (secondNum <= 10) {
    while (firstNum <= 10) {
        console.log(`${firstNum} * ${secondNum} = `, firstNum * secondNum);
        firstNum++
    }
    firstNum = 1
    secondNum++
    console.log('/--/--/--/--/--/')
}