var defaultArray = ['a', 'b', 'c']
var toExtend = [1, 2, 3]
defaultArray.push(...toExtend)
console.log(defaultArray)

var defaultArray2 = [1, 2, 3]
defaultArray2.reverse()
console.log(defaultArray2)

var defaultArray3 = [1, 2, 3]
var toExtend2 = [4, 5, 6]
defaultArray3.unshift(...toExtend2)
console.log(defaultArray3)

var defaultArray4 = [1, 2, 3, 4, 5]
var defaultArray4Slice = defaultArray4.slice(0,3)
console.log(defaultArray4Slice)

var defaultArray5 = ['js', 'css', 'jq']
console.log(defaultArray5[0])


function fromPairs(array) {
    var result = {}
    for (var i = 0; i < array.length; i++) {
        result[array[i][0]] = array[i][1]
    }
    return result
}

const data = [['a', 1], ['b', 2]];
console.log(fromPairs(data))
