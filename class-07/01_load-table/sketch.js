// PGTE Data Visualization - Spring 2017
// -------------------------------------

function setup() {
  noCanvas();
  loadTable("../data/gtrend_SNL.csv", "header", gotData);  // callback function
}

function gotData(table) {
  print(table);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  // iterate over all the rows in the table
  for (var i = 0; i < table.getRowCount(); i++) {
    var row = table.getRow(i);

    // You can access the fields via their column name (or index)
    var month = row.get("month");
    var popularity = row.get("popularity");

    createP(month + "\t , " + popularity);
  }
}
