float x, y;
float circleSize;

float speed;  //aka Frequency
float size;   //aka Amplitude

color rainbow;
int hue;
int mode;

void setup() {
  size(500,500);
  background(0);
  colorMode(HSB, 360, 100, 100);
  
  x = width/2;
  y = height/2;
  circleSize = 15;
  
  mode = 1;
  
  speed = 0.05;
  size = width/4;
  noStroke();
}

void draw() {
  fill(0,10);
  rect(0,0, width, height);
  
  switch(mode) {
    case 1:  //LOADING CIRCLE
      x = size * cos(frameCount*speed);
      y = size * sin(frameCount*speed);
      break;
    case 2:  //SPIRAL
      size += 0.1;
      x = size * cos(frameCount*speed);
      y = size * sin(frameCount*speed);
      break;
    case 3:  //PULSE
      circleSize = abs(size * sin(frameCount*speed));
      break;
    case 4:  //OSCILLATE
      x = size * cos(frameCount*speed);
      //y position doesn't change so we don't need it
      break;
    case 5:  //WAVES
      x = (frameCount % width) - width/2;
      y = size * sin(frameCount*speed);
      break;
  }

  rainbow = color(hue, 100, 100);
  hue = (hue + 1) % 360;
  hue++;

  translate(width/2, height/2);
  fill(rainbow);
  ellipse(x, y, circleSize, circleSize);  
  
  if (keyPressed) {
    if(key == CODED) {
      if (keyCode == UP) {
        //increase the amplitude
        size++;  
      } else if (keyCode == DOWN) {
        //decrease the amplitude
        size--; 
      } else if (keyCode == RIGHT) {
        //increase the frequency
        speed *= 1.05;
      } else if (keyCode == LEFT) {
        //decrease the frequency
        speed *= 0.95; 
      }
    }  
  }
  
}

void keyPressed() {
  switch(key) {
    case '1':
      mode = 1;
      println("LOADING CIRCLE");
      break;
    case '2':
      size = 0;
      mode = 2;
      println("SPIRAL");
      break;
    case '3':
      mode = 3;
      println("PULSE");
      break;
    case '4':
      mode = 4;
      println("OSCILLATE");
      break;
    case '5':
      mode = 5;
      println("WAVES");
      break;
  }
}



