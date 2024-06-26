function calculateSum(array) {
    var sum = array.reduce(function(a, b) {
        return typeof b === 'number' ? a + b : a;
    }, 0);

    return sum;
}

console.log(calculateSum([1, 2, 3, 4]));
console.log(calculateSum(["fpt", true, 3, 1, "keke", 10]));