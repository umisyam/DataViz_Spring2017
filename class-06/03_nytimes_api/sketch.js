// PGTE Data Visualization - Spring 2017
// -------------------------------------

var apiKey = "1548985a281744b09be735431b84f704";
var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";

var q = prompt("What are you searching now?", "Moonlight");
var query = "?q=" + q + "&sort=newest";
var fullURL = url+query+"&api-key="+apiKey;

function setup() {
  noCanvas();
  loadJSON(fullURL, gotData);
}

function gotData(rawdata) {
  var data = rawdata.response.docs;
  console.log(data);

  for (var i=0; i<data.length; i++) {
    var headline = createElement('h3', '');
    var link = createA(data[i].web_url, data[i].headline.main);
    link.parent(headline);
    headline.parent('results');

    var para = createP(data[i].lead_paragraph);
    para.parent('results');
  }
}
