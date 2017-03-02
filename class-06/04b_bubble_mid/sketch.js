var start, end, total, w;
var myBubbles = [];
var myScale;

// Make a url that searhces for term appeared in a given year
function makeURL(term,year) {
  var api = 'https://api.nytimes.com/svc/search/v2/articlesearch.jsonp?callback=svc_search_v2_articlesearch&';
  var query = '?q='+term+'&begin_date='+year+'0101&end_date='+year+'1231';
  var test = '&facet_field=source&facet_filter=true';
  var fq = '&fq=headline:(\"'+ term +'\")';
  var fl = '&fl=headline,web_url,word_count,pub_date,type_of_material';
  var apikey = "&api-key=1548985a281744b09be735431b84f704";

  var url = api+query+fq+fl+apikey;
  return url;
}

function setup() {
  var canvas = createCanvas(740, 740);
  myScale = 2;

  // How many years to look at?
  start = 2000;
  end = 2017;
  total = end - start;

  // What should we search for?
  input = select('#search');
  var button = select('#submit');
  // Execute the query
  button.mousePressed(searchIt);
}

// This callback is for when the user clicks the button
function searchIt() {
  var term = input.value();
  // Loop through every year
  for (var i = 0; i < total; i++) {
    var year = start + i;
    // Make the API query URL
    var url = makeURL(term, year);
    // Run the query and keep track of the index
    goJSON(url, i);
  }
}

function goJSON(url, index) {

  // The NYTimes will complain if you hit them too quickly with
  // many requests, so this spaces them out by 100 millis
  setTimeout(delayLoad, index * 1000);

  // Run the query with that specific URL
  function delayLoad() {
    loadJSON(url, loaded, 'jsonp');
  }

  function loaded(rawdata) {
    var data = rawdata.response.docs;

    for (var i=0; i<data.length; i++) {
      var headline = data[i].headline.main;
      var wordcount = data[i].word_count;
      var pubdate = data[i].pub_date;
      var year = pubdate.substring(0,4);

      var b = new Bubble(headline, wordcount, year);
      myBubbles.push(b);
    }
    // console.log(myBubbles);
  }
}

function draw() {
  background(255,255,255);

  push();
    translate(width/2, height/2);

    for (var i = 0; i < myBubbles.length; i++) {
      myBubbles[i].display();
    }
  pop();
}


// --------------------------------BUBBLE CLASS------------------------------
// Constructor of a class named Bubble
var Bubble = function(_headline, _wordcount, _year) {
  this.headline = _headline;
  this.wordcount = _wordcount;
  this.year = _year;
  this.radius = sqrt(this.wordcount/PI);
  var bubbleSize = this.radius * myScale;
  var tempBubbleSize = 0;
  var text0;

  this.pos = createVector(random(0,width), random(0,height));

  this.isHovering = function() {
    var distance = dist(mouseX, mouseY, this.pos.x +  width/2, this.pos.y + height/2);
    if(distance < bubbleSize/2){
      return true;
    } else{
      return false;
    }
  }

  this.display = function() {

    if(this.isHovering()){
      opacity = 255;
      textO = 255;
    } else {
      opacity = 150;
      textO = 0;
    }

    //bubble display
    strokeWeight(1);
    stroke(0);
    fill(255);
    ellipse(this.pos.x, this.pos.y, tempBubbleSize, tempBubbleSize);

    //text display
    noStroke();
    fill(0, textO);
    textAlign(CENTER);
    text(this.headline, this.pos.x, this.pos.y);
    text(this.year, this.pos.x, this.pos.y+15);
    text(this.wordcount, this.pos.x, this.pos.y+30);
  }
}
