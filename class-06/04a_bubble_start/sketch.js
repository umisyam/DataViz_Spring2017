var start, end, total, w;

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


  }
}

function draw() {
  background(255,255,255);

}

function drawRadius() {

}



// --------------------------------BUBBLE CLASS------------------------------
// Constructor of a class named Bubble
var Bubble = function() {
  this.isHovering = function() {

  }

  this.update = function() {

  }

  this.display = function() {

  }
}
