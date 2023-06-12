function less(a1, a2, compare) {
  return compare(a1, a2) < 0;
}

function exchange(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

var StackNode = function (value) {
  this.value = value;
  this.next = null;
};

export { StackNode };

var Stack = function () {
  this.N = 0;
  this.first = null;
};

Stack.prototype.push = function (a) {
  this.first = this._push(this.first, a);
};

Stack.prototype._push = function (x, a) {
  if (x == null) {
    this.N++;
    return new StackNode(a);
  }
  var oldX = x;
  this.N++;
  x = new StackNode(a);
  x.next = oldX;
  return x;
};

Stack.prototype.pop = function () {
  if (this.first == null) {
    return undefined;
  }

  var oldFirst = this.first;
  var item = oldFirst.value;
  this.first = oldFirst.next;
  this.N--;

  return item;
};

Stack.prototype.size = function () {
  return this.N;
};

Stack.prototype.isEmpty = function () {
  return this.N == 0;
};

Stack.prototype.peep = function () {
  if (this.first == null) {
    return undefined;
  }

  return this.first.value;
};

Stack.prototype.toArray = function () {
  var result = [];
  var x = this.first;
  while (x != null) {
    result.push(x.value);
    x = x.next;
  }
  return result;
};

export { Stack };

var QueueNode = function (a) {
  this.value = a;
  this.next = null;
};

export { QueueNode };

var Queue = function () {
  this.first = null;
  this.last = null;
  this.N = 0;
};

Queue.prototype.enqueue = function (item) {
  var oldLast = this.last;
  this.last = new QueueNode(item);
  if (oldLast != null) {
    oldLast.next = this.last;
  }
  if (this.first == null) {
    this.first = this.last;
  }
  this.N++;
};

Queue.prototype.dequeue = function () {
  if (this.first == null) {
    return undefined;
  }

  var oldFirst = this.first;
  var item = oldFirst.value;
  this.first = oldFirst.next;

  if (this.first == null) {
    this.last = null;
  }

  this.N--;

  return item;
};

Queue.prototype.size = function () {
  return this.N;
};

Queue.prototype.isEmpty = function () {
  return this.N == 0;
};

Queue.prototype.toArray = function () {
  var result = [];
  var x = this.first;
  while (x != null) {
    result.push(x.value);
    x = x.next;
  }
  return result;
};

export { Queue };

var DiGraph = function (V) {
  this.V = V;
  this.adjList = [];
  this.nodeInfo = [];
  this.edges = {};
  for (var v = 0; v < V; ++v) {
    this.adjList.push([]);
    this.nodeInfo.push({});
  }
};

DiGraph.prototype.addEdge = function (v, w) {
  this.adjList[v].push(w);
  var edge_id = v + '_' + w;
  this.edges[edge_id] = new Edge(v, w, 0);
};

DiGraph.prototype.edge = function (v, w) {
  var edge_id = v + '_' + w;
  if (edge_id in this.edges) {
    return this.edges[edge_id];
  } else {
    return null;
  }
};

DiGraph.prototype.adj = function (v) {
  return this.adjList[v];
};

DiGraph.prototype.node = function (v) {
  return this.nodeInfo[v];
};

DiGraph.prototype.reverse = function () {
  var g = new DiGraph(this.V);
  for (var v = 0; v < this.V; ++v) {
    var adj_v = this.adjList[v];
    for (var i = 0; i < adj_v.length; ++i) {
      var w = adj_v[i];
      g.addEdge(w, v);
    }
  }
  return g;
};

export { DiGraph };

var Edge = function (v, w, weight) {
  this.v = v;
  this.w = w;
  this.weight = weight;
};

Edge.prototype.either = function () {
  return this.v;
};

Edge.prototype.other = function (x) {
  return x == this.v ? this.w : this.v;
};

Edge.prototype.from = function () {
  return this.v;
};

Edge.prototype.to = function () {
  return this.w;
};

export { Edge };

var Graph = function (V) {
  this.V = V;
  this.adjList = [];
  this.nodeInfo = [];

  this.edges = {};
  for (var i = 0; i < V; ++i) {
    this.adjList.push([]);
    this.nodeInfo.push({});
  }
};

Graph.prototype.addEdge = function (v, w) {
  this.adjList[v].push(w);
  this.adjList[w].push(v);
  var edge_id = v + '_' + w;
  if (v > w) {
    edge_id = w + '_' + v;
  }
  this.edges[edge_id] = new Edge(v, w, 0);
};

Graph.prototype.adj = function (v) {
  return this.adjList[v];
};

Graph.prototype.node = function (v) {
  return this.nodeInfo[v];
};

Graph.prototype.edge = function (v, w) {
  var edge_id = v + '_' + w;
  if (v > w) {
    edge_id = w + '_' + v;
  }
  if (edge_id in this.edges) {
    return this.edges[edge_id];
  }
  return null;
};
export { Graph };

var WeightedGraph = function (V) {
  this.V = V;
  this.adjList = [];
  this.nodeInfo = [];

  for (var v = 0; v < V; ++v) {
    this.adjList.push([]);
    this.nodeInfo.push({});
  }
};

WeightedGraph.prototype.adj = function (v) {
  return this.adjList[v];
};

WeightedGraph.prototype.edge = function (v, w) {
  var adj_v = this.adjList[v];
  for (var i = 0; i < adj_v.length; ++i) {
    var x = adj_v[i].other(v);
    if (x == w) {
      return adj_v[i];
    }
  }
  return null;
};

WeightedGraph.prototype.node = function (v) {
  return this.nodeInfo[v];
};

WeightedGraph.prototype.addEdge = function (e) {
  var v = e.either();
  var w = e.other(v);
  this.adjList[v].push(e);
  this.adjList[w].push(e);
};

export { WeightedGraph };

var WeightedDiGraph = function (V) {
  WeightedGraph.call(this, V);
};

WeightedDiGraph.prototype = Object.create(WeightedGraph.prototype);

WeightedDiGraph.prototype.addEdge = function (e) {
  var v = e.from();
  this.adjList[v].push(e);
};

WeightedDiGraph.prototype.edge = function (v, w) {
  var adj_v = this.adjList[v];
  for (var i = 0; i < adj_v.length; ++i) {
    var x = adj_v[i].other(v);
    if (x == w) {
      return adj_v[i];
    }
  }
  return null;
};

WeightedDiGraph.prototype.toDiGraph = function () {
  var g = new DiGraph(this.V);
  for (var v = 0; v < this.V; ++v) {
    var adj_v = this.adjList[v];
    for (var i = 0; i < adj_v.length; ++i) {
      var e = adj_v[i];
      var w = e.other(v);
      g.addEdge(v, w);
    }
  }
  return g;
};

export { WeightedDiGraph };

var DepthFirstSearch = function (G, s) {
  this.s = s;
  var V = G.V;
  this.marked = [];
  this.edgeTo = [];
  for (var v = 0; v < V; ++v) {
    this.marked.push(false);
    this.edgeTo.push(-1);
  }

  this.dfs(G, s);
};

DepthFirstSearch.prototype.dfs = function (G, v) {
  this.marked[v] = true;
  var adj_v = G.adj(v);
  for (var i = 0; i < adj_v.length; ++i) {
    var w = adj_v[i];
    if (!this.marked[w]) {
      this.edgeTo[w] = v;
      this.dfs(G, w);
    }
  }
};

DepthFirstSearch.prototype.hasPathTo = function (v) {
  return this.marked[v];
};

DepthFirstSearch.prototype.pathTo = function (v) {
  var path = new Stack();
  if (v == this.s) return [v];

  for (var x = v; x != this.s; x = this.edgeTo[x]) {
    path.push(x);
  }
  path.push(this.s);
  return path.toArray();
};

export { DepthFirstSearch };

var BreadthFirstSearch = function (G, s) {
  var V = G.V;
  this.s = s;

  var queue = new Queue();
  queue.enqueue(s);
  this.marked = [];
  this.edgeTo = [];

  for (var v = 0; v < V; ++v) {
    this.marked.push(false);
    this.edgeTo.push(-1);
  }

  while (!queue.isEmpty()) {
    var v = queue.dequeue();
    this.marked[v] = true;
    var adj_v = G.adj(v);
    for (var i = 0; i < adj_v.length; ++i) {
      var w = adj_v[i];
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        queue.enqueue(w);
      }
    }
  }
};

BreadthFirstSearch.prototype.hasPathTo = function (v) {
  return this.marked[v];
};

BreadthFirstSearch.prototype.pathTo = function (v) {
  var path = new Stack();
  if (v == this.s) return [v];

  for (var x = v; x != this.s; x = this.edgeTo[x]) {
    path.push(x);
  }
  path.push(this.s);
  return path.toArray();
};

export { BreadthFirstSearch };

var IndexMinPQ = function (N, compare) {
  this.keys = [];
  this.pq = [];
  this.qp = []; // positions of key in pq

  for (var i = 0; i <= N; ++i) {
    this.keys.push(null);
    this.pq.push(0);
    this.qp.push(-1);
  }
  this.N = 0;

  if (!compare) {
    compare = function (a1, a2) {
      return a1 - a2;
    };
  }
  this.compare = compare;
};

IndexMinPQ.prototype.insert = function (index, key) {
  this.keys[index] = key;

  this.pq[++this.N] = index;
  this.qp[index] = this.N;
  this.swim(this.N);
};

IndexMinPQ.prototype.decreaseKey = function (index, key) {
  if (less(key, this.keys[index], this.compare)) {
    this.keys[index] = key;
    this.swim(this.qp[index]);
  }
};

IndexMinPQ.prototype.minKey = function () {
  return this.keys[this.pq[1]];
};

IndexMinPQ.prototype.min = function () {
  return this.pq[1];
};

IndexMinPQ.prototype.delMin = function () {
  var key = this.pq[1];
  exchange(this.pq, 1, this.N);

  this.qp[this.pq[1]] = 1;

  this.qp[this.pq[this.N]] = -1;

  this.keys[this.pq[this.N]] = null;

  this.N--;

  this.sink(1);

  return key;
};

IndexMinPQ.prototype.swim = function (k) {
  while (k > 1) {
    var parent = Math.floor(k / 2);

    if (less(this.keys[this.pq[k]], this.keys[this.pq[parent]], this.compare)) {
      exchange(this.pq, k, parent);

      this.qp[this.pq[k]] = k;
      this.qp[this.pq[parent]] = parent;

      k = parent;
    } else {
      break;
    }
  }
};

IndexMinPQ.prototype.sink = function (k) {
  while (2 * k <= this.N) {
    var child = k * 2;
    if (
      child < this.N &&
      less(
        this.keys[this.pq[child + 1]],
        this.keys[this.pq[child]],
        this.compare,
      )
    ) {
      child++;
    }

    if (less(this.keys[this.pq[child]], this.keys[this.pq[k]], this.compare)) {
      exchange(this.pq, k, child);
      this.qp[this.pq[k]] = k;
      this.qp[this.pq[child]] = child;
      k = child;
    } else {
      break;
    }
  }
};

IndexMinPQ.prototype.containsIndex = function (index) {
  return this.qp[index] != -1;
};

IndexMinPQ.prototype.isEmpty = function () {
  return this.N == 0;
};

IndexMinPQ.prototype.size = function () {
  return this.N;
};

export { IndexMinPQ };

var Dijkstra = function (G, s) {
  var V = G.V;
  this.s = s;
  this.marked = [];
  this.edgeTo = [];
  this.cost = [];
  this.pq = new IndexMinPQ(V, function (cost1, cost2) {
    return cost1, cost2;
  });

  for (var v = 0; v < V; ++v) {
    this.marked.push(false);
    this.edgeTo.push(null);
    this.cost.push(Number.MAX_VALUE);
  }

  this.cost[s] = 0;

  this.pq.insert(s, this.cost[s]);

  while (!this.pq.isEmpty()) {
    var v = this.pq.delMin();
    this.marked[v] = true;
    var adj_v = G.adj(v);
    for (var i = 0; i < adj_v.length; ++i) {
      var e = adj_v[i];
      this.relax(e);
    }
  }
};

Dijkstra.prototype.relax = function (e) {
  var v = e.from();
  var w = e.to();

  if (this.cost[w] > this.cost[v] + e.weight) {
    this.cost[w] = this.cost[v] + e.weight;
    this.edgeTo[w] = e;
    if (this.pq.containsIndex(w)) {
      this.pq.decreaseKey(w, this.cost[w]);
    } else {
      this.pq.insert(w, this.cost[w]);
    }
  }
};

Dijkstra.prototype.hasPathTo = function (v) {
  return this.marked[v];
};

Dijkstra.prototype.pathTo = function (v) {
  var path = new Stack();
  for (var x = v; x != this.s; x = this.edgeTo[x].other(x)) {
    path.push(this.edgeTo[x]);
  }
  return path.toArray();
};

Dijkstra.prototype.distanceTo = function (v) {
  return this.cost[v];
};

export { Dijkstra };
