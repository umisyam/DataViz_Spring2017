// PGTE Data Visualization - Spring 2017
// -------------------------------------

var r = 100;
var speed = 0.05;

function setup() {
  createCanvas(600,600);
  background(0);
  smooth();
}

function draw() {
  var x = frameCount % width;
  console.log(x);
  var y = r * sin(frameCount * speed);

  fill(0,255,255);
  noStroke();
  ellipse(x, y+height/2, 10, 10);

}
