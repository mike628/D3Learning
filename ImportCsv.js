var dataset;

function yearFilter(min, max) {
    return function (x) {
        if (x.YEAR <= max && x.YEAR >= min) return x
    }
};
d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;

// d3.select("body").selectAll("p").data(dataset).enter().append("p").text(function(d){return d.POPULATION});

});

function setMinValue(minYear, p1) {
    var x = document.getElementById(p1);
    var y = document.getElementById(minYear);
    x.innerHTML = y.value;
}

function setMaxValue(maxYear, p2) {
    var x = document.getElementById(p2);
    var y = document.getElementById(maxYear);
    x.innerHTML = y.value;
}

window.onload = function () {
    setMinValue('minYear', 'p1');
    setMaxValue('maxYear', 'p2');
}
document.getElementById("clickMe").onclick = settimespanandrun;

function settimespanandrun() {
    var firstYear = parseInt(minYear.value);
    var lastYear = parseInt(maxYear.value);
    var years = yearFilter(firstYear, lastYear);
    var yearFilterDataSet = dataset.filter(years);
    d3.select("body").selectAll("p").data(yearFilterDataSet).enter().append("p").text(function (d) {
        return d.YEAR + " " + d.POPULATION
    });
}
    function update() {
        d3.select("body").selectAll("p").data(yearFilterDataSet).enter().append("p").text(function (d) {
            return d.YEAR + " " + d.POPULATION


}