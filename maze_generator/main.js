var grid = [];
var edges = [];
var cells;
var scl = 20;
var n;
var m;
var player;

function setup()
{
	createCanvas(500, 500);
	n = height / scl - 1;
	m = width / scl - 1;
	generateMaze();
}

function draw()
{
	background(255);
	for (var i = 0; i < n; i++)
		for (var j = 0; j < m; j++)
			grid[i][j].display();
}

function mousePressed()
{
	generateMaze();
}

function generateMaze()
{
	for (var i = 0; i < n; i++)
	{
		grid[i] = [];
		for (var j = 0; j < m; j++)
			grid[i][j] = new Cell(i, j);
	}

	for (var i = 0; i < n; i++)
		for (var j = 0; j < m - 1; j++)
			edges.push([i, j, 2]);

	for (var i = 0; i < n - 1; i++)
		for (var j = 0; j < m; j++)
			edges.push([i, j, 3]);

	cells = new DisjointSet(n * m);
	shuffle(edges, true);

	for (var idx = 0; idx < edges.length; idx++)
	{
		var i = edges[idx][0];
		var j = edges[idx][1];
		var k = edges[idx][2];
		mergeCell(i, j, k);
	}
}

function mergeCell(i0, j0, k0)
{
	//up, left, right, down
	var di = [-1, 0, 0, 1];
	var dj = [ 0,-1, 1, 0];
	var i1 = i0 + di[k0];
	var j1 = j0 + dj[k0];

	if (i1 < 0 || i1 >= n || j1 < 0 || j1 >= m) return;

	var u = i0 * m + j0;
	var v = i1 * m + j1;
	if (cells.joinSet(u, v))
	{
		grid[i0][j0].delete(k0);
		var k1 = 3 - k0;
		grid[i1][j1].delete(k1);
	}
}
