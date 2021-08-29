function max(arr) {
    if (arr.length) {
        if (arr.length === 1) {
            return arr[0]
        } else {
            let maxNum = arr[0]
            for (let i = 1; i < arr.length; i++) {
                if (maxNum < arr[i]) {
                    maxNum = arr[i]
                }
            }
            return maxNum
        }
    } else {
        return 'Empty array'
    }
}

function maxRecursive(arr) {
    if (arr.length) {
        if (arr.length === 1) {
            return arr[0]
        } else {
            let maxNumPos = arr[0]
            let maxNumPos2 = maxRecursive(arr.slice(1))
            if (maxNumPos > maxNumPos2) {
                return maxNumPos
            }
        return maxNumPos2
        }
    } else {
        return 'Empty array'
    }
}

console.log(max([8]), 'one element test, must return 8');
console.log(max([1, 8, 37, 5, 17]), '5 elements test, must return 37');
console.log(max([8, 17]), '2 elements test, must return 17');
console.log(max([]));

console.log(maxRecursive([8]), 'one element test, must return 8');
console.log(maxRecursive([1, 8, 37, 5, 17]), '5 elements test, must return 37');
console.log(maxRecursive([8, 17]), '2 elements test, must return 17');
console.log(max([]));