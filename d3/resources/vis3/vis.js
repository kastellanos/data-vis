/**
 * Created by Vivelab on 31/05/2017.
 */
var width = 960;
var height = 500;
var padding = 30;
var x = d3.scaleLinear();
var y = d3.scaleLinear();

var axisMargin = 20,
    margin = 40,
    valueMargin = 4,
    barHeight = 0,
    barPadding = 0,
    data, bar, svg, scale, xAxis, labelWidth = 0;

function build_svg( c ){
    return c.append("svg").attr("width",width+30).attr("height",height+30);
}


function build_rectangles( s, data ){
    rect = s.selectAll(".bar")
        .data(data)
        .enter().append("g")
    rect.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });
    rect.append("text")
        .attr("class", "label")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function(d){
            return d.arma;
        }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    });
    //BUILD SCALE
    max = d3.max(data, function(d) { return d.count; });
    x.range([0,width-margin*2-labelWidth]).domain([0,max]);
    rect.append("rect")
        .attr("transform", "translate("+labelWidth+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            //alert(x(d.count));
            return x(d.count);
        });
    var div = d3.select("body").append("div").attr("class", "toolTip");
    rect
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html("<div class='title'>"+(d.arma)+"</div><div class='message'>"+(d.count)+"</div>");
        });
    rect
        .on("mouseout", function(d){
            div.style("display", "none");
        });
    //BUILD AXIS
    var xAxis = d3.axisBottom(x).tickSize(-height + 2*margin+axisMargin);
    s.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
        .call(xAxis);
}

function build_bars( s ){
    d3.json("http://www.mocky.io/v2/59309ebd1000000c09995f2a",function(d){
            d.count = +d.count;
            //alert(d.count);
            return d;
        }, function(error,data){
            if (error) throw error;
            barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
            barPadding = (height-axisMargin-margin*2)*0.6/data.length,

            build_rectangles(s, data);
        }

    )
}
function main(){
    var container = d3.select(".chart");
    var svg = build_svg(container);

    build_bars( svg );
}

main();











