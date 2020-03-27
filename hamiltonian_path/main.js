const CITYMAX = 15;
const POPMAX = 1000;
const PMUTATION = 1;
// const PMUTATION = 0.05;
const MAXGEN = 300;

var generation = 0;
var cities = [];
var ga;


// DP
var ans;
var ansPath = [];
var last = (((CITYMAX - 1) >> 1) & 1) ^ ((CITYMAX - 1) & 1 ? 1 : CITYMAX - 1);
var memo = [];
// /DP

const TEXT_SIZE = 32;

function setup()
{
	createCanvas(600, 600);
	textSize(TEXT_SIZE);

	for (var i = 0; i < CITYMAX; i++)
	{
		var x = random(width);
		var y = random(height / 2);
		cities[i] = createVector(x, y);
	}

	ga = new GeneticAlgo(PMUTATION, POPMAX);
}

function draw()
{
	var bestSoFar = ga.getBest();
	var permutation = bestSoFar.getGenes();
	var totalDistance = bestSoFar.getFitness();

	background(255);

	noFill();
	strokeJoin(ROUND);

	stroke(0);
	strokeWeight(3);

	beginShape();
	for (var i = 0; i < cities.length; i++)
	{
		var index = permutation[i];
		vertex(cities[index].x, cities[index].y);
	}
	endShape();

	fill(255);
	for (var i = 0; i < cities.length; i++)
		ellipse(cities[i].x, cities[i].y, 8, 8);

	var ppTotalDistance = (-totalDistance).toFixed(2);
	text(`Total cost (GA): ${ppTotalDistance}`, 0, 300 + TEXT_SIZE);

	if (generation > MAXGEN)
	{
		noLoop();

		// DP
		DP(permutation[0]);

		var ppAns = ans.toFixed(2);
		var ppDiff = (-(ans + totalDistance)).toFixed(2);
		text(`Total cost (DP): ${ans}`, 0, 300 + 2 * TEXT_SIZE);
		text(`Distance cost from optimal: ${-(ans + totalDistance)}`, 0, 300 + 3 * TEXT_SIZE);

		translate(0, 0);
		noFill();
		strokeWeight(2);
		drawingContext.setLineDash([5, 10]);
		// beginShape();
		for (var i = 1; i < cities.length; i++) {
			if (permutation[i - 1] == ansPath[i - 1] && permutation[i] == ansPath[i]) {
				stroke(0, 256, 0);
			} else {
				stroke(256, 0, 0);
			}
			line(cities[ansPath[i - 1]].x, cities[ansPath[i - 1]].y, cities[ansPath[i]].x, cities[ansPath[i]].y)
			// vertex(cities[ansPath[i]].x, cities[ansPath[i]].y);
		}
		// endShape();

		console.log("Diff = ", -(ans + totalDistance));
		console.log(permutation);
		console.log(ansPath);
		// /DP
		console.log('end');
	}

	update();

	if (ga.getBest().getFitness() <= totalDistance) generation++;
	else generation = 0;
}

function update()
{
	ga.newGeneration();
	ga.evaluate();
}


// DP
function DP(src)
{
	for (var i = 0; i < CITYMAX; i++)
	{
		memo[i] = [];
		for (var j = 0; j < (1 << CITYMAX); j++)
			memo[i][j] = -1;
	}

	ans = dfs(src, 0);
	path(src, 1 << src);
}

function dfs(u, mask)
{
	mask |= (1 << u);

	if (mask == (1 << CITYMAX) - 1) return 0;

	if (memo[u][mask] != -1) return memo[u][mask];

	memo[u][mask] = Infinity;
	for (var v = 0; v < CITYMAX; v++)
	{
		if ((mask & (1 << v)) == 0)
		{
			var val = dfs(v, mask) + cities[u].dist(cities[v]);
			memo[u][mask] = min(memo[u][mask], val);
		}
	}

	return memo[u][mask];
}

function path(u, mask)
{
	ansPath.push(u);
	last ^= u;

	for (var v = 0; v < CITYMAX; v++)
		if (!(mask & (1 << v)) &&
			memo[u][mask] == memo[v][mask | (1 << v)] + cities[u].dist(cities[v]))
			return path(v, mask | (1 << v));

	ansPath.push(last);
}
// /DP
