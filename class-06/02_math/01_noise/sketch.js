// PGTE Data Visualization - Spring 2017
// -------------------------------------

var n = 100;
var x;
var y = .05;
var noiseY;

function setup() {
  createCanvas(480,320);
  frameRate(15);
}

function draw() {
  background(255);
  // stroke(100);

  for(var i = 1; i < n; i++) {
    y += .03;
    x = i* (width/n);
    noiseY = noise(y) * height;
    line(x, height, x, noiseY);
  }
}

// Perlin noise
// var time = 0.0;
// var increment = 0.01;
//
// function setup() {
//   createCanvas(200, 200);
// }
//
// function draw() {
//   background(255);
//
//   // Get a noise value at "time" and scale it according to the window's width.
//   var n = noise(time) * width;
//
//   // With each cycle, increment the " time "
//   time += increment;
//
//   // Draw the ellipse with size determined by Perlin noise
//   fill(0);
//   ellipse(width/2, height/2, n, n);
// }


// Random Walker
// var xtime = 0.0;
// var ytime = 100.0;
// var increment = 0.01;
//
// function setup() {
//   createCanvas(480, 270);
// }
//
// function draw() {
//   background(255);
//   var x = noise(xtime) * width;
//   var y = noise(ytime) * height;
//   xtime += increment;
//   ytime += increment;
//   // Draw the ellipse with size determined by Perlin noise
//   stroke(0);
//   fill(175);
//   ellipse(x, y, 32, 32);
// }
