function DNA(customGenes = [])
{
	this.genes = [];
	this.genesSize = CITYMAX;
	this.fitness = 0;

	if (customGenes.length == 0)
	{
		for (var i = 0; i < this.genesSize; i++) this.genes[i] = i;
		shuffle(this.genes, 1);
	}
	else this.genes = customGenes;
}

DNA.prototype.getGenes = function() { return this.genes; };

DNA.prototype.inversion = function()
{
	var ip = [];

	for (var i = 0; i < this.genesSize; i++)
	{
		ip[i] = 0;
		for (var j = 0; this.genes[j] != i; j++)
			ip[i] += (this.genes[j] > i);
	}

	return ip;
};

DNA.prototype.reversion = function(ip)
{
	var p = [];

	for (var i = 0; i < this.genesSize; i++) p[i] = -1;

	for (var i = 0; i < this.genesSize; i++)
	{
		for (var j = 0; ip[i] || p[j] != -1; j++)
			ip[i] -= (p[j] == -1);
		p[j] = i;
	}

	return p;
}

DNA.prototype.crossover = function(other)
{
	// var point = floor(random(this.genesSize - 1));
	var point = floor(random(this.genesSize));

	var invA = this.inversion();
	var invB = other.inversion();

	var invChild = invA.slice(0, point).concat(invB.slice(point));

	var newGenes = this.reversion(invChild);
	var child = new DNA(newGenes);

	return child;
};

DNA.prototype.mutate = function()
{
	var point = floor(random(this.genesSize));
	var inv = this.inversion();

	var upperBound = this.genesSize - point;
	inv[point] = floor(random(upperBound));

	this.genes = this.reversion(inv);
};

DNA.prototype.computeFitness = function ()
{
	this.fitness = 0;

	for (var i = 1; i < this.genes.length; i++)
	{
		var u = this.genes[i - 1];
		var v = this.genes[i];
		this.fitness += cities[u].dist(cities[v]);
	}

	return -this.fitness;
};

DNA.prototype.getFitness = function()
{
	return this.computeFitness();
};
