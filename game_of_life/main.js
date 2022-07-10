var n, m;
var sz = 10;
var grid = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 140);

  n = floor(width / sz);
  m = floor(height / sz);

  initialize();
}

function draw() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      grid[i][j].display();
    }
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      grid[i][j].update();
    }
  }

  frameRate(12);
}

function mousePressed() {
  initialize();
}

function initialize() {
  for (var i = 0; i < n; i++) {
    grid[i] = [];
    for (var j = 0; j < m; j++) {
      grid[i][j] = new Cell(i, j, floor(2 * random()));
    }
  }
}

function isInsideGrid(i, j) {
  return i < n && i >= 0 && j < m && j >= 0;
}
