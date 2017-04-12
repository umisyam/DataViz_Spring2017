var maxW = 900;
var maxH = 400;
var margin = { top: 20, right: 100, bottom: 40, left: 100};
var width = maxW - margin.right - margin.left;
var height = maxH - margin.top - margin.bottom;

var buttons = d3.selectAll("button")
    .classed("button", true);

var parseTime = d3.timeParse("%Y");
var years = ["1995", "2015"];
var xScale = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(years, function(d) {
      return parseTime(d);
		}));

var yScale = d3.scaleLinear()
    .range([0, height]);

var xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeYear)
    .tickPadding([10]);

var yAxis = d3.axisLeft(yScale);

var line = d3.line()
    .x(function(d) { return xScale(parseTime(d.year)); })
    .y(function(d) { return yScale(+d.number); });

var svg = d3.select("#chart")
    .append("svg")
      .attr("width", maxW)
      .attr("height", maxH)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var tooltip = d3.select("body")
    .append("div")
    .attr("class", "mytooltip");

//------------- MAIN FUNCTIONS ---------------
d3.queue()
    .defer(d3.csv,"data/Rice.csv")
    .defer(d3.csv,"data/Wheat.csv")
    .defer(d3.csv,"data/Soybean.csv")
    .defer(d3.csv,"data/Maize.csv")
    .await(drawLineChart);

function drawLineChart(error, rice, wheat, soybean, maize) {
  if(error) { console.log(error); }
  // console.log(rice);
  // console.log(wheat);
  // console.log(soybean);
  // console.log(maize);
  d3.select("#rice").classed("selected", true);

  yScale.domain([d3.max(rice, function(d) {
    return +d.number;
  }), 0]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  redraw(rice, 4.0);


  d3.select("#rice").on("click", function(d, i) {
    d3.selectAll("button").classed("selected", false);
    d3.select(this).classed("selected", true);
    redraw(rice,4.0);
  });

  d3.select("#wheat").on("click", function(d, i) {
    d3.selectAll("button").classed("selected", false);
    d3.select(this).classed("selected", true);
    redraw(wheat,3.0);
  });

  d3.select("#soybean").on("click", function(d, i) {
    d3.selectAll("button").classed("selected", false);
    d3.select(this).classed("selected", true);
    redraw(soybean,2.0);
  });

  d3.select("#maize").on("click", function(d, i) {
    d3.selectAll("button").classed("selected", false);
    d3.select(this).classed("selected", true);
    redraw(maize,5.0);
  });
}

function redraw (data, cutoff) {
  yScale.domain([d3.max(data, function(d) {
    return +d.number;
  }), 0]);

  var dataset =  d3.nest()
    .key(function(d) { return d.location; })
    .sortValues(function (a, b) { return parseTime(a.year) - parseTime(b.year)})
    .entries(data);

  console.log("nested data", dataset);

  // create grouping layer for individual line
  var groups = svg.selectAll("g.lines")
    .data(dataset, function(d){
      // console.log(d);
      return d.key;
    });
  groups.enter()
    .append("g")
    .attr("class", "lines")
  groups.exit().remove();

  // create path for each line
  var lines = groups.selectAll("path.line")
    .data(function(d) {
      return [d.values];
    });

  lines.enter()
    .append("path")
    .attr("d", line)
    .attr("class", "line")
    .classed("unfocused", true);

  lines.exit()
    .transition()
    .duration(1000)
    .remove();

  lines
    .transition()
    .duration(1000)
    .attr("d",line);

  var circles = groups.selectAll("circle")
    .data(function(d) {
      return d.values;
    });

  circles.enter()
    .append("circle")
    .attr("r", 5)
    .classed("circle", true)
    .style("opacity", 0);

  circles.exit().remove();

  circles.transition()
    .attr("cx",function(d){return xScale(parseTime(d.year));})
    .attr("cy", function(d) {return yScale(+d.number);});

  circles.on("mouseover", mouseoverFunc)
    .on("mousemove", mousemoveFunc)
    .on("mouseout", mouseoutFunc);

  var labels = groups.selectAll("text.label")
    .data(function(d){
      return [d.values];
    });

  labels.enter()
        .append("text")
        .classed("label", true)
        .text(function(d) {
          return d[d.length-1].location;
        });

  labels.exit().remove();

  labels.transition()
        .duration(2000)
        .attr("y",function(d){
          var lastNumber = d[d.length - 1].number;
          return yScale(+lastNumber);})
        .attr("x", function(d){
          var lastYear = d[d.length - 1].year;
          return xScale(parseTime(lastYear));
        })
        .attr("dx", ".35em")
        .attr("dy", ".35em");

  labels.classed("textshow", function(d,i){
    if (d && +d[d.length - 1].number > cutoff) {
      return true;
    }
    else {return false; };
  });

  labels.classed("texthide", function(d, i) {
    if (d && +d[d.length - 1].number < cutoff) {
      return true;
    }
    else {return false; };
  });

  groups
    .on("mouseover", TIn)
    .on("mouseout", TOut);

  d3.select(".y.axis").transition().call(yAxis);
} // end of function redraw()

function mouseoverFunc(d) {
  d3.select(this)
  .transition()
  .style("opacity", 1)
  .attr("r", 4);

  tooltip
  .style("display", null)
  .html("<p>Country: <span style='color:#fff'>" + d.location +"</span>" + "<br>Year: <span style='color:#fff'>" + d.year +"</span>" + "<br>Tons/hectare:<span style='color:#fff'> " + d.number + "</span>" + "</p>");
}

function mousemoveFunc(d) {
  console.log(d3.event.pageX, d3.event.pageY);
  tooltip.style("top", (d3.event.pageY - 5) + "px" )
        .style("left", (d3.event.pageX + 5) + "px");
}

function mouseoutFunc(d) {
  d3.select(this)
    .transition()
    .style("opacity", 0)
    .attr("r", 2);
    tooltip.style("display", "none");
}

function TIn(d) {
  d3.select(this).select("path")
    .classed("unfocused", false)
    .classed("focused", true);
    d3.select(this).select("text.label")
    .attr("id", "highlight");
}

function TOut(d) {
  d3.select(this).select("path")
    .classed("unfocused", true)
    .classed("focused", false);
    d3.select(this).select("text.label")
    .attr("id",null);
}
