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
  fill(0,10);
  rect(0,0,width,height);

  var x = r * cos(theta);
  var y = r * sin(theta);

  fill(0,255,255);
  noStroke();
  ellipse(x + width/2, y + height/2, 20, 20);

  theta += 0.05;
}
