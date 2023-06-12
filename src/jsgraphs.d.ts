declare namespace JsGraphs {
  interface Node {
    label?: string;
  }
  class StackNode<T> {
    value: T;
    next: StackNode<T> | null;
    constructor(value: T);
  }
  class Stack<T> {
    private N;
    private first;
    constructor();
    push(a: T): void;
    _push(x: StackNode<T> | null, a: T): StackNode<T>;
    pop(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    peep(): T | undefined;
    toArray(): T[];
  }
  class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null;
    constructor(a: T);
  }
  class Queue<T> {
    private first;
    private last;
    private N;
    constructor();
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    toArray(): T[];
  }
  class IndexMinPQ<T> {
    private keys;
    private pq;
    private qp;
    private N;
    private compare;
    constructor(N: number, compare?: (a1: any, a2: any) => number);
    insert(index: number, key: T): void;
    decreaseKey(index: number, key: T): void;
    minKey(): T | null;
    min(): number;
    delMin(): number;
    swim(k: number): void;
    sink(k: number): void;
    containsIndex(index: number): boolean;
    isEmpty(): boolean;
    size(): number;
  }
  class Graph {
    V: number;
    private adjList;
    private nodeInfo;
    private edges;
    constructor(V: number);
    addEdge(v: number, w: number): void;
    adj(v: number): number[];
    node(v: number): Node;
    edge(v: number, w: number): Edge | null;
  }
  class DiGraph {
    V: number;
    private adjList;
    private nodeInfo;
    private edges;
    constructor(V: number);
    addEdge(v: number, w: number): void;
    edge(v: number, w: number): Edge | null;
    adj(v: number): number[];
    node(v: number): Node;
    reverse(): DiGraph;
  }
  class Edge {
    private v;
    private w;
    weight: number;
    label?: string;
    constructor(v: number, w: number, weight: number);
    either(): number;
    other(x: number): number;
    from(): number;
    to(): number;
  }
  class WeightedGraph {
    V: number;
    protected adjList: Edge[][];
    private nodeInfo;
    constructor(V: number);
    adj(v: number): Edge[];
    edge(v: number, w: number): Edge | null;
    node(v: number): Node;
    addEdge(e: Edge): void;
  }
  class WeightedDiGraph extends WeightedGraph {
    addEdge(e: Edge): void;
    edge(v: number, w: number): Edge | null;
    toDiGraph(): DiGraph;
  }
  class DepthFirstSearch<T> {
    private s;
    private marked;
    private edgeTo;
    constructor(G: Graph, s: number);
    dfs(G: Graph, v: number): void;
    hasPathTo(v: number): boolean;
    pathTo(v: number): number[];
  }
  class BreadthFirstSearch {
    private V;
    private s;
    private marked;
    private edgeTo;
    constructor(G: Graph, s: number);
    hasPathTo(v: number): boolean;
    pathTo(v: number): number[];
  }
  class Dijkstra {
    private s;
    private marked;
    private edgeTo;
    private cost;
    private pq;
    constructor(G: WeightedGraph, s: number);
    relax(e: Edge): void;
    hasPathTo(v: number): boolean;
    pathTo(v: number): Edge[];
    distanceTo(v: number): number;
  }
}

declare module 'js-graph-algorithms' {
  export = JsGraphs;
}
