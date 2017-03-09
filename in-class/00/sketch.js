// PGTE Data Visualization - Spring 2017
// -------------------------------------

var bars = [];
var mx = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadTable("gtrend_SNL.csv","header", gotData);

  textAlign(CENTER);
}

function gotData(table) {
  print(table);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  for (var i=0; i<table.getRowCount(); i++) {
      var row = table.getRow(i);

      var month = row.get("month");
      var popularity = row.get("popularity");
      // createP(month + " , " + popularity);
      var x = map(i, 0, table.getRowCount(), 50, width-50);
      var y = map(popularity, 0, 100, height/2, 100);

      bars.push({
        x : x,
        y : y,
        month: month,
        popularity: popularity
      });
  }
  print(bars);
}

function draw() {
  background(240);

  for (var i=0; i<bars.length; i++) {
    //make highlights
    if ((mx > 50) && (mx < width-50)) {
      strokeWeight(5);
      stroke("yellow");
      line(mx, 50, mx, height/2);

      if (abs(mx - bars[i].x) < 2) {
        fill("blue");
        noStroke();
        textAlign(LEFT);
        text(bars[i].month, mx + 10, bars[i].y - 25);
        text(bars[i].popularity, mx + 10, bars[i].y - 40);
      }
    }

    //draw the bars
    strokeWeight(1);
    stroke(0);
    line(bars[i].x, bars[i].y , bars[i].x , height/2);
    noStroke();
    fill(127);
    ellipse(bars[i].x, bars[i].y, 5, 5);
  }

  for (var i=0; i<bars.length; i+=12) {
    text(bars[i].month, bars[i].x, height/2 + 25);

    stroke("red");
    strokeWeight(3);
    strokeCap(SQUARE);
    line(bars[i].x, bars[i].y , bars[i].x , height/2);
    noStroke();
  }
}

function mouseMoved() {
  mx = mouseX;
}
