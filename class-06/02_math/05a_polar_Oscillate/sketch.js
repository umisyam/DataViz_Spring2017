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

  var x = r * sin(theta * 0.05);
  //  we dont need a new Y variable because we're not changing its position

  fill(0,255,255);
  noStroke();
  ellipse(x+width/2, height/2, 10, 10);

  theta += 1;
}
