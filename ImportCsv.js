var dataset;
var treeData;
(function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            treeData = JSON.parse(xobj.response);
            createCheckBoxes(treeData);
        }
    };
    xobj.send(null);
})()

function yearFilter(min, max) {Hmmm
    return function (x) {
        if (x.YEAR <= max && x.YEAR >= min) return x
    }
};
d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;

    d3.select("body").selectAll("p").data(dataset).enter().append("p").text(function (d) {
        return d.YEAR + " " + d.POPULATION
    });

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
    newData.text(function (d) {
        return d.YEAR + " " + d.POPULATION
    });
// insert new data
    newData.enter().append("p").text(function (d) {
        return d.YEAR + " " + d.POPULATION
    })
// Remove extra data
    newData.exit().remove();
}
/*
    rows = number of rows per column;
 */
var createCheckBoxes = function (treeData) {
    var checkboxGroup = document.createElement("div");
    checkboxGroup.className = "checkboxGroup";
    var x = 0;
    var checkboxColumn = document.createElement("div");
    checkboxColumn.className = "CheckBoxColumn";

    for (var property in dataset[0]) {
        if (dataset[0].hasOwnProperty(property)) {

            var checkboxLineItem = document.createElement("div");
            // Create Checkboxes for each Field
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = property;
            checkbox.value = property;
            checkbox.id = property;
            checkbox.className = "form-check-input"
            checkbox.onclick = function(){console.log(this.id)};
            // Create Label for Each Checkbox
            var label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.appendChild(document.createTextNode(checkbox.name));
            checkboxLineItem.appendChild(checkbox);
            checkboxLineItem.appendChild(label);
            x++;

            checkboxColumn.appendChild(checkboxLineItem);
            checkboxGroup.appendChild(checkboxColumn);
            if (x >= treeData.rows) {
                checkboxColumn = document.createElement("div");
                checkboxColumn.className = "CheckBoxColumn";
                x = 0;
            }


        }
    }
    var parentDiv = document.getElementById("afterCheckboxes").parentNode;
    var sp2 = document.getElementById("afterCheckboxes");
    parentDiv.insertBefore(checkboxGroup, sp2);
    console.log(property)
}