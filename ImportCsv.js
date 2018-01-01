var dataset;
var treeData;

d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv", function (data) {
    dataset = data;
    dataset = redefineDataset();
    cleanData()
    barChart();
    dataButtons(3);
});

function cleanData() {
    for (var i = 0; i <= dataset.length; i++)
        for (var property in dataset[i]) {
            if (dataset[i].hasOwnProperty(property)) {
                if(dataset[i][property]==="")
                {
                    dataset[i][property]=1
                }
                else {
                    dataset[i][property] = dataset[i][property].replace(/\D/g, '');
                }
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
    cat.forEach(function (element,i) {
        var dataButton = document.createElement("button");
        dataButton.className = "attributeButton"
        dataButton.name = "button" + element;
        dataButton.value = element;
        dataButton.id = "d"+i;
        dataButton.innerHTML = element;
        dataButton.onclick = createClickHandler(dataButton.id);

        buttonGroup.appendChild(dataButton);
    })

    var parentDiv = document.getElementById("afterCheckboxes").parentNode;
    var sp2 = document.getElementById("afterCheckboxes");
    parentDiv.insertBefore(buttonGroup, sp2);
}
var createClickHandler = function (id) {
    return function () {
        updateBarChart(id);
    }
}

function handleMouseOver(d, i) {
    // Add interactivity
    let myLabel = d['ROBBERY'];
    var svg = d3.select("svg");

    // Use D3 to select element, change color and size
    var text = svg.selectAll("text")
        .data([d['ROBBERY']])
        .enter()
        .append("text")
        .attr("id", "t" + i);
    var textLabels = text
        .attr("x", w - 50)

        .attr("y", h - 30)
        .text(function () {
            return myLabel;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "red");
    // Specify where to put label of text
}

function handleMouseOut(d, i) {

    d3.select("#t" + i).remove();  // Remove text location
}

var w = 800;
var h = 200;
var barPadding = 1;
var barChart = function (propertyItem) {
    if (propertyItem == null) {
        var propertyItem = "ROBBERY";
    }
    var x = d3.scaleBand()
        .range([0, w], .1);

    var y = d3.scaleLinear()
        .range([h, 0]);
    y.domain([0, d3.max(dataset[1], function (d) {
        return d;
    })]);

    var svg = d3.select("body").append("svg");
    svg.attr("width", w).attr("height", h);
    svg.selectAll("rect")
        .data(dataset[1])
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return i * (w / dataset[1].length);

        })
        .attr("height", function (d) {
            return h - y(d);
        })
        .attr("width", w / dataset[1].length - barPadding)
        .attr("y", function (d) {
            return y(d);
        })
    svg.selectAll("text")
        .data(dataset[1])
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return i * (w / dataset[1].length) + (w / dataset[1].length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return y(d)+10;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "white");
    //.on("mouseover", handleMouseOver)

    //.on("mouseover", handleMouseOver.bind(propertyItem))
    // .on("mouseout", handleMouseOut);
    svg.exit().remove();
}
var arr = [];
var cat = new Array();

function redefineDataset() {
    var a = [];

    for (var property in dataset[0]) {

        if (dataset[0].hasOwnProperty(property)) {
            cat.push(property);
            a.push(new Array());
        }

    }

        for (j = 0; j < dataset.length; j++) {
           for(i=0;i<cat.length;i++)
           {

               if (dataset[j].hasOwnProperty(cat[i])) {
                   propertyItem = cat[i];

                   a[i].push(dataset[j][propertyItem])

               }
           }
        }
    return a;
}

var updateBarChart = function (id) {
    var id = id.substr(1);
    var tempDataset
    tempDataset=dataset[parseInt(id)]
    var x = d3.scaleBand()
        .range([0, w], .1);

    var y = d3.scaleLinear()
        .range([h, 0]);
    y.domain([0, d3.max(tempDataset, function (d) {
        return d;
    })]);

    if (propertyItem == null) {
        var propertyItem = "ROBBERY";
    }

    var svg = d3.select("svg");
    svg.attr("width", w).attr("height", h);
    svg.selectAll("rect")
        .data(tempDataset)
        .attr("x", function (d, i) {
            return i * (w / tempDataset.length);

        })
        .attr("height", function (d) {
            return h - y(d);
        })
        .attr("width", w / tempDataset.length - barPadding)
        .attr("y", function (d) {
            return y(d)+10;
        })
    //.on("mouseover", handleMouseOver)
    // .on("mouseout", handleMouseOut);
    svg.selectAll("text")
        .data(tempDataset)
        //.enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
            return i * (w / tempDataset.length) + (w / tempDataset.length - barPadding) / 2;
        })
        .attr("y", function (d) {
            return h - (d * 4) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");

}
