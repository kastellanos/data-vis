/**
 * Created by Vivelab on 31/05/2017.
 */
var width = 500;
var height = 500;
var padding = 30;
var x = d3.scaleBand().rangeRound([0,width]).padding(0.1)
var y = d3.scaleLinear().rangeRound([width,0]);

function build_svg( c ){
    return c.append("svg").attr("width",width+30).attr("height",height+30);
}

function build_scale( data ){

    x.domain(data.map(function(d){
        return d.letter;
    }));
    y.domain([0,d3.max(data,function(d){return d.frequency;})]);
}

function build_axis( s, data ){
    build_scale(data);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y).ticks(10,"%");
    s.append("g").attr("transform", "translate(0," + (height) + ")").call(xAxis);
    s.append("g").call(yAxis);
}

function build_rectangles( s, data ){
    s.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("y", function(d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.frequency); });
}

function build_bars( s ){
    d3.tsv("resources/vis1/data.csv",function(d){
            d.frequency = +d.frequency;
            return d;
        }, function(error,data){
            if (error) throw error;
            build_axis(s, data);
            build_rectangles(s, data);
        }

    )
}
function main(){
    var container = d3.select(".chart");
    var svg = build_svg(container);
    var g = svg.append("g")
        .attr("transform", "translate(" + 40 + "," + 10 + ")");
    build_bars( g );
}

main();