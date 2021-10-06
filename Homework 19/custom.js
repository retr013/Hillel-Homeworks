//1
var x = 10;
var obj = {x: 15};

function fun() {
    alert(this.x);
    alert(this);
}

fun();
fun.call(obj);


//2
var person = {
    firstName:"John",
    lastName: "Konor",
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var user = {
    firstName:"Max",
    lastName: "White",
}

alert(person.fullName.call(user));


//3
var tester = function(a, b, c) {
    alert(Object.getOwnPropertyNames(arguments));
};

tester("a", "b", "c");
tester.apply(null, ["a", "b", "c"]);
