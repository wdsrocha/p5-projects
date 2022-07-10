function DisjointSet(n) {
  this.parent = [];
  this.rank = [];
  for (var i = 0; i <= n; i++) {
    this.parent[i] = i;
    this.rank[i] = 1;
  }
}

DisjointSet.prototype.findSet = function (target) {
  if (target != this.parent[target]) {
    this.parent[target] = this.findSet(this.parent[target]);
  }
  return this.parent[target];
};

DisjointSet.prototype.joinSet = function (u, v) {
  u = this.findSet(u);
  v = this.findSet(v);
  if (u == v) return false;

  if (this.rank[u] < this.rank[v]) {
    [u, v] = [v, u];
  }
  this.parent[v] = u;
  this.rank[u] += this.rank[v];
  return true;
};
