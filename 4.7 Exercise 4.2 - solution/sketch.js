var maxXGold
var maxXSilver
var maxX

function preload() {
  // Load up the medals table data
  table = loadTable('medals_table.csv', 'csv', 'header');
}

function setup() {
  var c = createCanvas(800, 1000);
  noLoop()
  
  // Get max medals so we can set the x axis max value
  maxXGold = max(table.getColumn('gold'))
  maxXSilver = max(table.getColumn('silver'))
  maxX = max([maxXGold, maxXSilver]) // overall maxX is max of gold and silver
}

function draw() {
  background(255)
  
  var chartParams = {}

    // Draw the chart outline
  noFill()
  stroke(0)
  strokeWeight(1)
  rect(0,0,width,height)
  
  // Draw a horizontal bar chart
  HBarChart(table)
}

function HBarChart(data) {
  // Get number of rows (i.e. number of data points)
  var rowCount = data.getRowCount();

  // Get the column of gold and silver medals
  let golds = data.getColumn("gold")
  let silvers = data.getColumn("silver")
  
  // Define the drawing area
  drawingLeft = 130
  drawingRight = width - 50
  drawingTop = 50
  drawingBottom = height - 50

  // Compute width of the bar
  barGap = 2
  barHeight = (drawingBottom - drawingTop) / rowCount - barGap

  // Go through each row of data, drawing one bar for each row
  for (var r = 0; r < rowCount; r++) {
    // Get the number of golds and silvers for this row
    var xValGold = parseInt(golds[r],10);
    var xValSilver = parseInt(silvers[r],10);

    // For this row, compute the y coordinate of the top of the bar, mapping the row index r from data coordinates to screen coordinates
    var y = map(r, 0, rowCount, drawingTop, drawingBottom);

    // For this row, compute the x coordinate of the right of the bar, mapping number of medals to screen coordinates
    var xGold = map(xValGold, 0, maxX, drawingLeft, drawingRight);
    var xSilver = map(xValSilver, 0, maxX, drawingLeft, drawingRight);

    // Draw the bars.  The silver bar is offset by half the bar height, so the bars don't overlap
    noStroke()
    fill(color(255,215,0))
    rect(drawingLeft, y-barHeight, xGold-drawingLeft, barHeight/2)
    fill(color(200,200,200))
    rect(drawingLeft, y-barHeight+barHeight/2, xSilver-drawingLeft, barHeight/2)

    // Draw the y-axis and labels
    push() // save the current drawing styles and transformations
    translate(drawingLeft-15, y)  // move the drawing origin back to the right hand side of the labels
    noStroke();
    fill('black')
    textSize(10);
    textAlign(RIGHT, BASELINE);
    text(table.get(r, "country"), 0, 0);
    pop() // restore the current drawing styles and transformations
  }

  // Draw the title
  posx = this.width / 2
  posy = 40
  noStroke();
  fill('black')
  textAlign(CENTER, BASELINE);
  textSize(15);
  text("Olympics 2016", posx, posy);  
}


