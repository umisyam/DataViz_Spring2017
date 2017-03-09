// Below is modified from Daniel Shiffman's example on concordance
/**
 * CountingString example
 * by Daniel Shiffman.
 *
 * This example demonstrates how to use a IntDict to store
 * a number associated with a String.  Java HashMaps can also
 * be used for this, however, this example uses the IntDict
 * class offered by Processing's data package for simplicity
 * and added functionality.
 *
 * This example uses the IntDict to perform a simple concordance
 * http://en.wikipedia.org/wiki/Concordance_(publishing)
 *
 */

// An IntDict pairs Strings with integers
var concordance;

// The raw array of words in
var tokens;
var counter = 0;
var rawtext;

function preload() {
  rawtext = loadStrings("data/foodnames.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // concordance = createNumberDict();
  concordance = new p5.NumberDict();

  // Load file and chop it up
  var allText = join(rawtext, "\n").toLowerCase();
  tokens = splitTokens(allText, " ,.?!:;\n");
}

function draw() {
  background(51);
  fill(255);
  noStroke();

  // Look at words one at a time
  if (counter < tokens.length) {
    var s = tokens[counter];
    counter++;
    concordance.increment(s);
  }

  // x and y will be used to locate each word
  var x = 0;
  var y = 48;

  concordance.sortValuesReverse();
  var keys = concordance.keyArray();

  // Look at each word
  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var count = concordance.get(word);

    // Only display words that appear 3 times
    if (count > 3) {
      // The size is the count
      var fsize = constrain(count, 12, 60);
      textSize(fsize);
      text(word, x, y);
      // Move along the x-axis
      x += textWidth(word + " ");
    }

    // If x gets to the end, move y
    if (x > width) {
      x = 0;
      y += 48;
      // If y gets to the end, we're done
      if (y > height) {
        break;
      }
    }
  }
}
