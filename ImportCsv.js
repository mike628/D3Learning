var dataset;

function yearFilter(min, max) {
    return function (x) {
        if (x.YEAR <= max && x.YEAR >= min) return x
    }
};
d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;

d3.select("body").selectAll("p").data(dataset).enter().append("p").text(function(d){return d.YEAR + " " + d.POPULATION});
    createCheckBoxes();
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
document.getElementById("clickMe").onclick = update;

function settimespanandrun() {
    var firstYear = parseInt(minYear.value);
    var lastYear = parseInt(maxYear.value);
    var years = yearFilter(firstYear, lastYear);
     var yearFilterDataSet = dataset.filter(years);
     return yearFilterDataSet;

    };

    function update() {
        var newdataset = settimespanandrun();
        var newData = d3.select("body")
            .selectAll("p")
            .data(newdataset);
// update old data
        newData.text(function (d) {return d.YEAR + " " + d.POPULATION});
// insert new data
        newData.enter().append("p").text(function (d) {return d.YEAR + " " + d.POPULATION})
// Remove extra data
        newData.exit().remove();
    }
//TODO Remove Form and add parameters - classes for label and Checkbox
var createCheckBoxes = function(){
    var checkboxGroup = document.createElement("div");
    checkboxGroup.className="SmallRed container-fluid";
    for (var property in dataset[0]) {
        if (dataset[0].hasOwnProperty(property)) {
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = property;
            checkbox.value = property;
            checkbox.id = property;
            var label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode(checkbox.name));
            checkboxGroup.appendChild(label);
            checkboxGroup.appendChild(checkbox);

        }
    }
    var parentDiv = document.getElementById("childElement").parentNode;
    var sp2 = document.getElementById("childElement");
    parentDiv.insertBefore(checkboxGroup, sp2);
    console.log(property)
}