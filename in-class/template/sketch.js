// PGTE Data Visualization - Spring 2017
// -------------------------------------

function setup() {
  noCanvas();
  loadTable("gtrend_SNL.csv","header", gotData);
}

function gotData(table) {
  print(table);
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");
}
