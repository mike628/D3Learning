var dataset;
var treeData;

d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;
    cleanData()
    barChart();
    dataButtons(3);
});

function cleanData() {
    for (var i = 0; i <= dataset.length; i++)
        for (var property in dataset[i]) {
            if (dataset[i].hasOwnProperty(property)) {
                dataset[i][property] = dataset[i][property].replace(/\D/g, '');
            }
        }
}

/*
    rows = number of rows per column;
 */

var dataButtons = function () {
    var propertyItem;
    var buttonGroup = document.createElement("div");
    buttonGroup.className = "checkboxGroup";
    var x = 0;
    for (var property in dataset[0]) {
        propertyItem = property;
        if (dataset[0].hasOwnProperty(property)) {
            var dataButton = document.createElement("button");
            dataButton.className = "attributeButton"
            dataButton.name = "button" + property;
            dataButton.value = property;
            dataButton.id = property;
            dataButton.innerHTML = property;
            dataButton.onclick = createClickHandler(property);

            buttonGroup.appendChild(dataButton);
        }
    }
    var parentDiv = document.getElementById("afterCheckboxes").parentNode;
    var sp2 = document.getElementById("afterCheckboxes");
    parentDiv.insertBefore(buttonGroup, sp2);
}
var createClickHandler = function (property) {
    return function () {
        updateBarChart(property);
    }
}

function handleMouseOver(d, i) {
    // Add interactivity
    let myLabel = d[this];
    let myCatagory = this;
    console.log(myLabel);
    var svg = d3.select("svg");

    // Use D3 to select element, change color and size
    var text = svg.selectAll("text")
        .data(d[myCatagory])
        .enter()
        .append("text")
        .attr("id",i);
    var textLabels = text
        .attr("x", function () {
            return w - 50;
        })

        .attr("y", function () {
            return h - 30;
        })
        .text(function () {
            return myLabel;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "red");
    // Specify where to put label of text
}
function handleMouseOut(d, i) {

    d3.select("#"+i).remove();  // Remove text location
}
var w = 800;
var h = 200;
var barPadding = 1;
var barChart = function (propertyItem) {
    if (propertyItem == null) {
        var propertyItem = "ROBBERY";
    }

    var svg = d3.select("body").append("svg");
    svg.attr("width", w).attr("height", h);
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return i * (w / dataset.length);
        })
        .attr("height", function (d) {
            return d[propertyItem] * 4;
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("y", function (d) {
            return h - d[propertyItem] * 4;
        })
        .on("mouseover", handleMouseOver.bind(propertyItem))
        .on("mouseout", handleMouseOut);
    svg.exit().remove();
}

var updateBarChart = function (propertyItem) {
    var x = d3.scaleBand()
        .range([0, w], .1);

    var y = d3.scaleLinear()
        .range([h, 0]);
    y.domain([0, d3.max(dataset, function (d) {
        return d[propertyItem];
    })]);

    if (propertyItem == null) {
        var propertyItem = "ROBBERY";
    }

    var svg = d3.select("svg");
    svg.attr("width", w).attr("height", h);
    svg.selectAll("rect")
        .data(dataset)
        .attr("x", function (d, i) {
            return i * (w / dataset.length);

        })
        .attr("height", function (d) {
            return h - y(d[propertyItem]);
        })

        .attr("width", w / dataset.length - barPadding)
        .attr("y", function (d) {
            return y(d[propertyItem]);
        })

}
