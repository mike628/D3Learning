var startArray = [2, 3, 5, 7, 9, 11, 23, 45, 24, 31, 3, 65];

function minMaxFilter(min, max) {
    return function (x) {
        if (x < max && x > min) return x
    }
};
function yearFilter(min, max) {
    return function (x) {
        if (x.YEAR < max && x.YEAR > min) return x
    }
};
/*var func1 = yearFilter(1970, 1980);
var func2 = minMaxFilter(10, 40);

var endArray1 = startArray.filter(func1);
var endArray2 = startArray.filter(func2);
console.log(func1.toString());*/
