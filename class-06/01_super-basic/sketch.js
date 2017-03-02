// PGTE Data Visualization - Spring 2017
// -------------------------------------

// setup() runs first one time.
// createCanvas() should always be first line of setup
function setup() {
  // Set the size of the window
  createCanvas(500, 500);
  background(255);
}

function draw() {
  // make regular rectangle
  // stroke(5);
  // fill(255,0,0);
  // rect(50,100,75,100);

  // noFill() leaves the shape with only an outline.
  // noFill();
  // stroke(0);
  // ellipse(60,60,100,100);

  // Draw a line from previous mouse location to current mouse location.
  // line(pmouseX, pmouseY, mouseX, mouseY);

  // a bit cooler effect
  stroke(0);
  strokeWeight(abs(pmouseX - mouseX));  // get the absolute value from a number
  line(pmouseX, pmouseY, mouseX, mouseY);
}

// Whenever a user clicks the mouse the code written inside mousePressed() is executed.
function mousePressed() {
  stroke(0);
  fill(175);
  rectMode(CENTER);
  ellipse(mouseX,mouseY,20,20);
}

// Whenever a user presses a key the code written inside keyPressed() is executed.
function keyPressed() {
  background(255);
}
