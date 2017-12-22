var dataset;
var treeData;


d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;
    barChart();
    createCheckBoxes(3);
});



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
            checkbox.onclick = function () {
                console.log(this.id)
            };
            // Create Label for Each Checkbox
            var label = document.createElement('label')
            label.htmlFor = checkbox.id;
            label.className = "checkBoxFont"
            label.appendChild(document.createTextNode(checkbox.name));
            checkboxLineItem.appendChild(checkbox);
            checkboxLineItem.appendChild(label);
            x++;

            checkboxColumn.appendChild(checkboxLineItem);
            checkboxGroup.appendChild(checkboxColumn);
           if (x >= treeData) {
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
var w = 500;
var h = 200;
var barPadding = 1;
var barChart = function () {
    var svg = d3.select("body").append("svg");
    svg.attr("width", w).attr("height", h);
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
        .attr("height", function (d) {
            return d.RAPE * 4;
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("y", function (d) {
            return h - d.RAPE * 4;
        })
}
