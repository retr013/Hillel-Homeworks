function createCalculator(a) {
    let num = a;
    return {
        add: (b) => (isNaN(b)) ? NaN : num+=b,
        sub: (b) => (isNaN(b)) ? NaN : num-=b,
        get: () => console.log(num),
        set: function (b) {
            return (isNaN(b)) ? NaN : num = b;
        }
    }
}

const test = createCalculator(100)