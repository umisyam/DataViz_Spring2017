// PGTE Data Visualization - Spring 2017
// -------------------------------------

var x, y;
var circleSize;

var speed;  //aka Frequency
var r;   //aka Amplitude

var rainbow;
var hueValue;
var mode;

function setup() {
  createCanvas(600,600);
  background(0);
  colorMode(HSB, 100);

  x = width/2;
  y = height/2;
  circleSize = 15;

  mode = 1;
  hueValue = 0;

  speed = 0.05;
  r = width/4;
  noStroke();
}

function draw() {
  fill(0,10);
  rect(0,0, width, height);

  switch(mode) {
    case 1:  //LOADING CIRCLE
      x = r * cos(frameCount*speed);
      y = r * sin(frameCount*speed);
      break;
    case 2:  //SPIRAL
      r += 0.1;
      x = r * cos(frameCount*speed);
      y = r * sin(frameCount*speed);
      break;
    case 3:  //PULSE
      circleSize = abs(r * sin(frameCount*speed));
      break;
    case 4:  //OSCILLATE
      x = r * cos(frameCount*speed);
      //y position doesn't change so we don't need it
      break;
    case 5:  //WAVES
      x = (frameCount % width) - width/2;
      y = r * sin(frameCount*speed);
      break;
  }

  rainbow = color(hueValue, 100, 100);
  hueValue = (hueValue + 1) % 360;
  hueValue++;
  console.log(hueValue);

  translate(width/2, height/2);
  fill(rainbow);
  ellipse(x, y, circleSize, circleSize);

  if (keyPressed) {
    if (keyCode == UP_ARROW) {
      //increase the amplitude
      r++;
    } else if (keyCode == DOWN_ARROW) {
      //decrease the amplitude
      r--;
    } else if (keyCode == RIGHT_ARROW) {
      //increase the frequency
      speed *= 1.05;
    } else if (keyCode == LEFT_ARROW) {
      //decrease the frequency
      speed *= 0.95;
    }
  }
}

function keyPressed() {
  switch(key) {
    case '1':
      mode = 1;
      console.log("LOADING CIRCLE");
      break;
    case '2':
      r = 0;
      mode = 2;
      console.log("SPIRAL");
      break;
    case '3':
      mode = 3;
      console.log("PULSE");
      break;
    case '4':
      mode = 4;
      console.log("OSCILLATE");
      break;
    case '5':
      mode = 5;
      console.log("WAVES");
      break;
  }
}
