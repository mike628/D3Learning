var dataset;
function yearFilter(min, max) {
    return function (x) {
        if (x.YEAR < max && x.YEAR > min) return x
    }
};
d3.csv("./Datasets/Anne_Arundel_County_Crime_Rate_By_Type.csv",function(data){dataset=data;
var years = yearFilter(1970, 1980);
dataset = dataset.filter(years);
d3.select("body").selectAll("p").data(dataset).enter().append("p").text(function(d){return d.POPULATION});

});