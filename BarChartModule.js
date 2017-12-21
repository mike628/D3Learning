var config ={
    h:500,
    w:500,
    barPadding:1,
    dataset2:dataset
}
var BarchartModule = (function(config){

    var barChart = function()
    {
        var svg = d3.select("body").append("svg");
        svg.attr("width",config.w).attr("height",config.h);
        svg.selectAll("rect")
            .data(config.dataset2)
            .enter()
            .append("rect")
            .attr("x",function(d,i){return i*(config.w/config.dataset2.length);})
            .attr("height",function (d){return d.RAPE*4;})
            .attr("width",w/dataset.length-config.barPadding)
            .attr("y",function (d) {return config.h-d.RAPE*4;})
    }
    return barChart();

})(config)