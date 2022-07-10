function GeneticAlgo(mutationRate, populationSize) {
  this.population = [];
  this.best;
  this.mutationRate = mutationRate;
  this.populationSize = populationSize;

  for (var i = 0; i < this.populationSize; i++) this.population[i] = new DNA();

  this.best = this.population[0];
  this.evaluate();
}

GeneticAlgo.prototype.getPopulation = function () {
  return this.population;
};
GeneticAlgo.prototype.getBest = function () {
  return this.best;
};

GeneticAlgo.prototype.tournamentSelection = function (k) {
  var bestFitness = -Infinity;
  var bestIndex = -1;

  for (var i = 0; i < k; i++) {
    var index = floor(random(this.populationSize));
    var selected = this.population[index];

    if (selected.getFitness() > bestFitness) {
      bestFitness = this.population[index].getFitness();
      bestIndex = index;
    }
  }

  return bestIndex;
};

// Lacks Elitism!!!

GeneticAlgo.prototype.newGeneration = function () {
  newPopulation = [];

  for (var i = 0; i < this.populationSize; i++) {
    var indexA = this.tournamentSelection(2);
    var indexB = this.tournamentSelection(2);

    var parentA = this.population[indexA];
    var parentB = this.population[indexB];

    var child = parentA.crossover(parentB);
    if (random() < this.mutationRate) child.mutate();

    newPopulation[i] = child;
  }

  this.population = newPopulation;
};

GeneticAlgo.prototype.evaluate = function () {
  for (var i = 0; i < this.populationSize; i++)
    if (this.population[i].getFitness() > this.best.getFitness())
      this.best = this.population[i];
};
