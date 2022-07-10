function Cell(i, j, state)
{
	this.i = i;
	this.j = j;
	this.state = state;
	this.nextState = state;
}

Cell.prototype.getState = function()
{
	return this.state;
}

Cell.prototype.setState = function(state)
{
	if (typeof(state) === "boolean")
	{
		this.state = state;
	}
}

Cell.prototype.updateNextState = function(neighbourCount)
// Rules of life:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
{
	neighbourCount -= this.state;
	if (this.state == 1)
	{
		this.nextState = neighbourCount == 2 || neighbourCount == 3;
	}
	else
	{
		this.nextState = neighbourCount == 3;
	}
}

Cell.prototype.update = function()
{
	var neighbourCount = 0;
	for (var i = -1; i < 2; i++)
	{
		for (var j = -1; j < 2; j++)
		{
			var di = this.i + i;
			var dj = this.j + j;
			if (isInsideGrid(di, dj))
				neighbourCount += grid[di][dj].getState();
		}
	}

	this.updateNextState(neighbourCount);
}

Cell.prototype.display = function()
{
	var i = sz * this.i;
	var j = sz * this.j;
	this.state = this.nextState;

	fill((this.state ? 0 : 255));
	noStroke();
	rect(i, j, sz, sz);
};
