// PGTE Data Visualization - Spring 2017
// -------------------------------------

var bars = [];
var mx = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadTable("gtrend_SNL.csv", "header", gotData);  // callback function

  var header = createElement("h3", "Google Search Trend for 'Saturday Night Live'");
  header.position(width/2 - 140, 20);
  header.style("text-align", "center");
  // or, you can create SVG <text> too
  // textAlign(CENTER);
  // text("Google Searches for Saturday Night Live", width/2, 20);
}

function gotData(table) {
  // print(table);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  // iterate over all the rows in the table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);

    // You can access the fields via their column name (or index)
    var month = row.get("month");
    var popularity = +row.get("popularity");

    // createP(month + "\t , " + popularity);
    var x = map(i, 0, table.getRowCount(), 50, width-50);
    var y = map(popularity, 0, 100, height/2, 100);

    bars.push({
      x: x,
      y: y,
      month: month,
      popularity: popularity
    });
  }
  print(bars);
}

function draw() {
  noCursor();
  background(240);
  textAlign(CENTER);

  for (var i=0; i<bars.length; i++) {
    // Making the yellow highlights
    if((mx > 50) && (mx < width-50)) {
      strokeWeight(5);
      stroke("yellow");
      line(mx, 50, mx, height/2);

      if(abs(mx - bars[i].x) < 2) {
        fill("blue");
        text(bars[i].month, mx, bars[i].y - 25);
        text(bars[i].popularity, mx, bars[i].y - 40);
      }
    }
    // draw the bars
    strokeWeight(1);
    stroke(0);
    line(bars[i].x, bars[i].y, bars[i].x, height/2);
    noStroke();
    fill(127);
    ellipse(bars[i].x, bars[i].y, 7, 7);
  }

  // Uncomment if you wanna do line charts,
  // noFill();
  // stroke(0);
  // beginShape();
  // for (var i=0; i<bars.length; i++) {
  //   vertex(bars[i].x, bars[i].y);
  // }
  // endShape();

  for (var i=0; i<bars.length; i+=12) {
    // text(bars[i].month, bars[i].x, height/2 + 30);

    // fancier labels
    push();
    translate(bars[i].x - 10, height/2 + 30);
    rotate(-QUARTER_PI);
    text(bars[i].month, 0, 0);
    pop();

    // Lines and dots for the Year marks
    stroke(255,0,0);
    strokeWeight(3);
    strokeCap(SQUARE);
    line(bars[i].x, bars[i].y, bars[i].x, height/2);
    noStroke();
  }
}

function mouseMoved() {
  mx = mouseX;
}
