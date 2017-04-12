var maxH = 350;
var maxW = 700;
var margin = {top:12, bottom:40, left:25, right:80};
var height = maxH - margin.top - margin.bottom;
var width = maxW - margin.left - margin.right;

var parseTime = d3.timeParse("%Y");
xScale = d3.scaleTime().range([0,width]);
yScale = d3.scaleLinear().range([0,height]);

var svgLine = d3.select("#lineChart")
  .append("svg")
    .attr("class","lineChart")
    .attr("width",maxW)
    .attr("height",maxH)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeYear)
    .tickPadding([8])
    .tickSize([5]);

var yAxis = d3.axisRight(yScale)
    .ticks(7)
    .tickPadding([-width-10])
    .tickSize([width]);

var line = d3.line()
    .x(function(d) { return xScale(parseTime(d.year)); })
    .y(function(d) { return yScale(+d.amount); });

// Everything happens here
d3.csv("data/sales.csv", function(error, data) {
  if (error) throw error;
  console.log(data);  //important to try this bcos you'll realize that the column Header order has changed
  showlegend();

  var years = d3.keys(data[0]).slice(0,5);
  console.log("Years are: ",years);

  var dataset = [];

  data.forEach(function(d,i){
    var vehicleSales = [];  //array of vehicleSales from individual car model
    years.forEach(function(y){
      if(d[y]){
        vehicleSales.push({
          model: d.model,
          year: y,
          amount: d[y]/1000 //since in chart we're showing the data per thousand vehicles
        });
      }
    });
    // console.log(vehicleSales);
    dataset.push({
      model: d.model,
      sales: vehicleSales
    });
  });
  // console.log(dataset);

  function getVal(modelName){
    return dataset.filter(function(d){
      return d.model == modelName;
    });
  }

  // Draw the initial chart - the A3 vs 1/2 Series
  var initialData = d3.merge([getVal("A3"),getVal("1/2 Series")]);
  console.log("data for the first chart: ",initialData);
  drawInit(initialData);

  function drawInit(curData) {
    xScale.domain(d3.extent(years, function(d){
      return parseTime(d);
    }));

    yScale.domain([d3.max(curData, function(d){
      return d3.max(d.sales, function(d){
        return +d.amount;
      });
    })*1.2, 0]);

    var groups = svgLine.selectAll("g.line")
        .data(curData)
        .enter()
        .append("g")
        .attr("class",function(d){
          if(d.model.startsWith("A") || d.model.startsWith("Q"))
          return "audi line";
          else
          return "bmw line";
        });

    groups.selectAll("path")
        .data(function(d){return [d.sales];})
        .enter()
        .append("path")
        .attr("class","line")
        .attr("d",line);

    svgLine.append("g")
        .call(xAxis)
        .attr("class","x axis lineChart")
        .attr("transform","translate(0," + height + ")");

    svgLine.append("g")
        .call(yAxis)
        .attr("class","y axis lineChart")
        .selectAll("text")
        .style("text-anchor","end");

    groups.selectAll("circle")
        .data(function(d){return d.sales;})
        .enter()
      .append("circle")
        .attr("cx",function(d){return xScale(parseTime(d.year));})
        .attr("cy",function(d){return yScale(+d.amount);})
        .attr("r",1.5);

    groups.selectAll("text.dotVal")
        .data(function(d){return d.sales;})
        .enter()
      .append("text")
        .attr("class","dotVal notDisp")
        .attr("x",function(d){return xScale(parseTime(d.year));})
        .attr("y",function(d){return yScale(+d.amount);})
        .attr("dy", -10)
        .style("text-anchor", "middle")
        .text(function(d){
          return d3.format(",")(parseInt(d.amount*1000));
        });

    groups.append("text")
        .datum(function(d){
          return {
            model: d.model,
            lastSales: d.sales[d.sales.length - 1].amount
          };
        })
        .attr("x", width)
        .attr("y", function(d){
          return yScale(+d.lastSales);
        })
        .text(function(d){
          return d.model;
        })
        .attr("class", "label")
        .style("text-anchor","start")
        .attr("dx",8)
        .attr("dy",4);

    groups
      .on("mouseover",mouseOverFunc)
      .on("mouseout",mouseOutFunc);
  }

  // ---------------------------- Button Event Listeners
  d3.selectAll("button").on("click",function(d) {
    var btnIndex;
    if(d3.select(this).attr("id") == "group1") {
      var newData = d3.merge([getVal("A3"),getVal("1/2 Series")]);
      btnIndex = 1;
    } else if(d3.select(this).attr("id") == "group2"){
      var newData = d3.merge([getVal("A4"),getVal("3 Series")]);
      btnIndex = 2;
    } else if(d3.select(this).attr("id") == "group3"){
      var newData = d3.merge([getVal("Q5"),getVal("X3")]);
      btnIndex = 3;
    } else if(d3.select(this).attr("id") == "group4"){
      var newData = d3.merge([getVal("Q7"),getVal("X5")]);
      btnIndex = 4;
    }
    redraw(newData, btnIndex);
  });

  // ---------------------------- This is where we draw the chart
  function redraw(data, btnIndex) {
    //the xScale doesn't change, no need to update
    yScale.domain([d3.max(data, function(d){
      return d3.max(d.sales, function(d){
        return +d.amount;
      });
    })*1.2, 0]);

    d3.select(".y.axis.lineChart")
      .transition()
      .duration(1500)
      .call(yAxis)
      .selectAll("text")
      .style("text-anchor","end");

    d3.selectAll("button").classed("selected", false);
    d3.select("#group"+btnIndex).classed("selected", true);
    d3.selectAll("g.line")
      .select("path")
      .transition()
      .duration(1500)
      .attr("d",function(d,i){
        return line(data[i].sales);
      });

    d3.selectAll("g.line")
      .select("text.label")
      .transition()
      .duration(1500)
      .attr("y",function(d,i){
        var lastSales = data[i].sales[data[i].sales.length - 1].amount;
        return yScale(+lastSales);
      })
      .text(function(d,i){
        return data[i].model;
      });

    var groups = svgLine.selectAll("g.line");
    groups.selectAll("circle")
      .data(function(d,i){
        return data[i].sales;
      })
      .transition()
      .duration(1500)
      .attr("cy",function(d){return yScale(+d.amount);})
      .attr("r",3);

    groups.selectAll("text.dotVal")
      .data(function(d,i){
        return data[i].sales;
      })
      .transition()
      .duration(1500)
      .attr("y",function(d){return yScale(+d.amount);})
      .attr("dy", -10)
      .text(function(d){
        return d3.format(",")(parseInt(d.amount*1000));
      });
  }

}); // end of d3.csv()

// Helper functions
function mouseOverFunc(d){
  d3.selectAll("g.line")
    .classed("unfocused", true)
    .selectAll("circle").attr("r",1);
  d3.select(this)
    .classed("focused", true)
    .classed("unfocused", false)
    .selectAll("circle").attr("r",3);
  d3.select(this).selectAll("text").style("display", "block");
}

function mouseOutFunc(d){
  d3.selectAll("g.line")
  .classed("unfocused",false)
  .classed("focused",false)
  .selectAll("circle").attr("r",1.5);
  d3.selectAll("g.line").selectAll("text").style("display", null);
}

function showlegend(){
  var legend = svgLine.append("g").attr("class","legend");

  legend.append("circle")
    .style("fill","#418FC6")
    .attrs({cx: 30, cy: 30, r: 2});
  legend.append("circle")
    .style("fill","#418FC6")
    .attrs({cx: 50, cy: 30, r: 2});
  legend.append("line")
    .style("stroke","#418FC6")
    .style("stroke-width","2px")
    .attrs({x1: 30, y1: 30, x2: 50, y2: 30});
  legend.append("text")
    .text("BMW")
    .style("font-size","12px")
    .attrs({x: 55, y: 34});

  legend.append("circle")
    .style("fill","#E3314C")
    .attrs({cx: 30, cy: 45, r: 2});
  legend.append("circle")
    .style("fill","#E3314C")
    .attrs({cx: 50, cy: 45, r: 2});
  legend.append("line")
    .style("stroke","#E3314C")
    .style("stroke-width","2px")
    .attrs({x1: 30, y1: 45, x2: 50, y2: 45});
  legend.append("text")
    .text("Audi")
    .style("font-size","12px")
    .attrs({x: 55, y: 49});
}
// modified and turned from v3 into v4 from 
// https://bl.ocks.org/suneric1/b76051e23a8efc89947f
