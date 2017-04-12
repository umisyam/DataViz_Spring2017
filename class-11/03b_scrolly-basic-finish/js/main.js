var width = 500,
    height = 500,
    r = 40
// viewport height
var viewportHeight = window.innerHeight
var halfViewportHeight = viewportHeight / 2

var svg = d3.select('#graph')
  .append('svg')
  .attrs({width: width, height: height});	//this is the power of D3 + jetpack, if not, this is the same as writing:
	// .attr("width", width)
	// .attr("height", height);
var rect = svg.append('rect')
    .attrs({width: '100%', height: '100%', fill: 'blue'});

var circle = svg.append('circle')
    .attrs({cx: 0, cy: 0, r: r})

var bgcolors = ['red', 'orange', 'yellow', 'limegreen', 'turquoise']
var colors = ['white', 'purple', 'green', 'black', 'red']

// We're using graph-scroll library by Adam Pearce (this is best for d3-related scrolling)
// but there are plenty other scroller tutorial,
// e.g. https://github.com/mkfreeman/scrolling
// and http://vallandingham.me/scroller.html
var gs = d3.graphScroll()
    .container(d3.select('#container'))
    .graph(d3.selectAll('#graph'))
    .sections(d3.selectAll('#sections > div'))
    .offset(halfViewportHeight)
    .on('active', function(i){
      var pos = [ {cx: width - r, cy: r, r: r},
                  {cx: r,         cy: r},
                  {cx: width - r, cy: height - r},
                  {cx: width/2,   cy: height/2, r: r/2},
								 	{r: 2*r}
								][i];
      // Animate the background
      rect.transition().duration(500)
        	.transition()
          .style('fill', bgcolors[i]);
      // Animate the circle
      circle.transition().duration(1000)
          .attrs(pos)	//this is where D3 + jetpack really shines - imagine doing this in regular D3, would be a lot of lines!
        	.transition()
          .style('fill', colors[i]);
    })
