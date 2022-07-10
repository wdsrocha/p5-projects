function Cell(i, j)
{
	this.i = i;
	this.j = j;
	this.walls = [1, 1, 1, 1];
}

Cell.prototype.delete = function(side)
{
	if (side < 4) this.walls[side] = 0;
};

Cell.prototype.display = function()
{
	stroke(0);
	strokeWeight(scl / 10 + 1);
	var x = scl * this.j;
	var y = scl * this.i;
	if (this.walls[0]) line(x, y, x + scl, y); // top
	if (this.walls[1]) line(x, y, x, y + scl); // left
	x += scl;
	y += scl;
	if (this.walls[2]) line(x, y, x, y - scl); // right
	if (this.walls[3]) line(x, y, x - scl, y); // bottom
};
