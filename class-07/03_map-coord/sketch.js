// PGTE Data Visualization - Spring 2017
// -------------------------------------

var table;
var lowestViews;
var highestViews;

function preload() {
  table = loadTable("celeb2.tsv", "tsv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  print(table);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  lowestViews = 999999999;
  highestViews = 0;
  // 1. with the table class
  // 0          1       2        3           4            5            6             7        8    9       10            11        12         13         14       15      16                17   18                19                   20                  21        22
  //en_curid  name  numlangs  birthcity  birthstate  countryName  countryCode  countryCode3  LAT  LON  continentName  birthyear  gender  occupation  industry  domain  TotalPageViews  L_star  StdDevPageViews  PageViewsEnglish  PageViewsNonEnglish  AverageViews  HPI
  // iterate over all the rows in the table
}

function draw() {
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);

    // You can access the fields via their column name (or index)
    var views = row.getNum(22);
    if(lowestViews > views){
      lowestViews = views;
    }
    if(highestViews < views){
      highestViews = views;
    }
    // print(highestViews);
    // print(lowestViews);

    if(row.getNum(8) <= 0 || row.getNum(8) >= 0){
      var lat = row.getNum(8);
      var mappedLat = map(lat, 90, -90, 0, height);
      var lon = row.getNum(9);
      var mappedLon = map(lon, -180, 180, 0, width);
      // print(i, lat, lon);
      // print(mappedLat, mappedLon);

      var clr = map(row.getNum(22), lowestViews, highestViews, 0, 255);
      // colorMode(HSB);
      fill(clr, 0, 0);
      stroke(clr, 0, 0);
      strokeWeight(0.5);
      rect(mappedLon, mappedLat, 2, 2);
    }
  }

}
