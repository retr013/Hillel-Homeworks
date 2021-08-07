var age = +prompt('Your age: ', 16);
if (confirm('Do you smoke(yes/no): ')) {
    var smoker = 'yes';
} else {
    var smoker = 'no';
}

if (age <= 18 && smoker == 'no') {
    alert('Keep Going!!!')
} if (age > 18 && smoker == 'no') {
    alert('Nice!!!')
} if (age <= 18 && smoker == 'yes') {
    alert('I will tell ur mom!!!')
} if (age > 18 && smoker == 'yes') {
    alert('U d better not!!!')
}

function isLannisterSoldier(color, lion) {
    if (color == 'red' && lion == 'null') {
        return true;
    } else if (lion == 'lion') {
        return true;
    } else {
        return false;
    }
}

console.log(isLannisterSoldier('red', 'lion'));
console.log(isLannisterSoldier('blue', null));