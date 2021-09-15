// function createCalculator(a) {
//     let num = a;
//     return {
//         add: (b) => (isNaN(b)) ? NaN : num+=b,
//         sub: (b) => (isNaN(b)) ? NaN : num-=b,
//         get: () => console.log(num),
//         set: function (b) {
//             return (isNaN(b)) ? NaN : num = b;
//         }
//     }
// }
//
// const test = createCalculator(100)

function Calculator(base) {
    this.base = base
    this.intEval = function (a) {
        return Number.isInteger(a);
    }
    this.add = function (a) {
        if (this.intEval(a)) {
            return this.base += a;
        }
        return NaN
    }
    this.sub = function (a) {
        if (this.intEval(a)) {
            return this.base -= a;
        }
        return NaN
    }
    this.get = function () {
        return this.base;
    }
    this.set = function (a) {
        if (this.intEval(a)) {
            return this.base = a;
        }
        return NaN
    }
    this.default = function (a) {
        return this.base = base;
    }
}

const calc = new Calculator(100);
