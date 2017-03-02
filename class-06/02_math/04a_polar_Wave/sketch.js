// PGTE Data Visualization - Spring 2017
// -------------------------------------

var r = 100;
var theta = 0;

function setup() {
  createCanvas(600,600);
  background(0);
  smooth();
}

function draw() {
  var x = theta % width;
  var y = r * sin(theta * 0.05);

  fill(0,255,255);
  noStroke();
  ellipse(x, y+height/2, 10, 10);

  theta += 1;
}
