/**
 * Created by Vivelab on 31/05/2017.
 */
var width = 960;
var height = 500;
radius = Math.min(width, height) / 2;  
function build_pie(canvas, data){
    var pie = d3.pie()
    .sort(null)
    .value(function(d) {
        return d.value;
    });
    var arc = d3.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

    var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
    canvas.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function(d){ return d.data.label;}
    var color = d3.scale.category20();

     

     var slice = canvas.select(".slices").selectAll("path.slice")
        .data( pie(data), key);
    slice.enter()
        .insert("path")
        .style("fill", function(d) { return color(d.data.arma); })
        .attr("class", "slice");
    slice.exit()
}

function build_chart( s ){
    d3.csv("resources/vis3/data.csv",function(d){
            d.count = +d.count;
            return d;
        }, function(error,data){
            
            build_pie(s, data);
        }

    )
}

function build_svg( c ){
    c.append("svg")
    .append("g")
    c.append("g")
    .attr("class", "slices");
    c.append("g")
        .attr("class", "labels");
    c.append("g")
        .attr("class", "lines");
    return c;
}
function main(){
    var container = d3.select(".chart");
    var svg = build_svg(container);

    build_chart( svg );
}

main();











