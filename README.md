# js-graph-algorithms
Package provides javascript implementation of algorithms for graph processing

[![Build Status](https://travis-ci.org/chen0040/js-graph-algorithms.svg?branch=master)](https://travis-ci.org/chen0040/js-graph-algorithms) [![Coverage Status](https://coveralls.io/repos/github/chen0040/js-graph-algorithms/badge.svg?branch=master)](https://coveralls.io/github/chen0040/js-graph-algorithms?branch=master) 

# Features

* Depth First Search
* Breadth First Search
* Minimum Spanning Tree (Kruskal, Prim Lazy, Prim Eager)
* Shortest Paths (Dijkstra, Bellman-Ford, Topological Sort on DAG)
* MaxFlow-MinCut (Ford-Fulkerson)

# Usage

### Create an undirected unweighted graph

The sample code below shows how to create a undirected and unweighted graph:

```javascript
jsgraphs = require('js-graph-algorithms');

var g = new jsgraphs.Graph(6);
g.addEdge(0, 5); // add undirected edge connecting vertex 0 to vertex 5
g.addEdge(2, 4);
g.addEdge(2, 3);
g.addEdge(1, 2);
g.addEdge(0, 1);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(0, 2);

console.log(g.V); // display 6, which is the number of vertices in g
console.log(g.adj(0)); // display [5, 1, 2], which is the adjacent list to vertex 0
```

### Depth First Search

The sample code below show how to perform depth first search of an undirected graph

```javascript
jsgraphs = require('js-graph-algorithms');

var g = new jsgraphs.Graph(6);
g.addEdge(0, 5);
g.addEdge(2, 4);
g.addEdge(2, 3);
g.addEdge(1, 2);
g.addEdge(0, 1);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(0, 2);
var s = 0;
var dfs = new jsgraphs.DepthFirstSearch(g, s);


for(var v=0; v < g.V; ++v) {
 if(dfs.hasPathTo(v)) {
    console.log(s + " is connected to " + v);
    console.log("path: " + dfs.pathTo(v));
 } else {
     console.log('No path from ' + s + ' to ' + v);
 }
} 
```