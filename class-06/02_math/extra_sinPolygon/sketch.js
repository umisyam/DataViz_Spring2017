// PGTE Data Visualization - Spring 2017
// -------------------------------------

function setup() {
  createCanvas(600,600);
  frameRate(4);
}

function draw() {
  background(255);

  var weight = random(1, 10);
  strokeWeight(weight);

  //create and set our variables for the polygon:
  var sideIncrement = 0;
  var shapeRadius = width/4;
  var numberOfSides = random(10, 20);

  //start the shape:
  beginShape();

  //loops through a range between 0 and 2PI,
  //i.e. 360 degrees
  while (sideIncrement < TWO_PI) {

    //sets coordinates that are sine and cosine of
    //current increment between 0 and 2PI, creating a
    //ring of vertexes:
    var xPos = sin(sideIncrement)*shapeRadius;
    var yPos = cos(sideIncrement)*shapeRadius;

    //creates a new vertex at this position,
    //offset to center of screen:
    vertex(xPos+width*0.5, yPos+height*0.5);

    //advances to the next increment at which to draw a vertex
    //(full circle divided by number of sides you want)...
    sideIncrement += TWO_PI/numberOfSides;
  }

  //after all the vertices have been added, close the shape
  endShape(CLOSE);

}
