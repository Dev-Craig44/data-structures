import { Node } from "./Node";
import { Queue } from "./Queue";

export class Graph {
  private nodes: Map<string, Node> = new Map();
  private adjacencyList: Map<Node, Node[]> = new Map();

  public addNode(label: string): void {
    if (!this.nodes.has(label)) {
      const node = new Node(label);
      this.nodes.set(label, node);
      this.adjacencyList.set(node, []);
    }
  }

  public addEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from);
    if (!fromNode) throw new Error(`Node with label ${from} does not exist.`);
    const toNode = this.nodes.get(to);
    if (!toNode) throw new Error(`Node with label ${to} does not exist.`);
    this.adjacencyList.get(fromNode)?.push(toNode);
    // For undirected graphs, also add the reverse edge:
    // this.adjacencyList.get(toNode)?.push(fromNode);
  }

  public print(): void {
    for (const [node, neighbors] of this.adjacencyList.entries()) {
      if (neighbors.length > 0) {
        const neighborLabels = neighbors
          .map((neighbor) => neighbor.label)
          .join(", ");
        console.log(`${node.label} -> ${neighborLabels}`);
      }
    }
  }

  private removeNeighbor(neighbors: Node[], target: Node): void {
    const index = neighbors.indexOf(target);
    if (index !== -1) neighbors.splice(index, 1);
  }

  public removeNode(label: string): void {
    const node = this.nodes.get(label);
    if (!node) return;
    for (let [, neighbors] of this.adjacencyList.entries()) {
      this.removeNeighbor(neighbors, node);
    }
    this.adjacencyList.delete(node);
    this.nodes.delete(label);
  }

  public removeEdge(from: string, to: string): void {
    const fromNode = this.nodes.get(from);
    const toNode = this.nodes.get(to);
    if (!fromNode || !toNode) return;
    const neighbors = this.adjacencyList.get(fromNode);
    if (neighbors) this.removeNeighbor(neighbors, toNode);
  }

  // a name of our methods should never have anyuthing in it speaking to the implementation of the method. This is bad practice.
  // if tomorrow we change the implementation detail of our method that means that we would have to change the name to.
  public traversalDepthFirstRec(root: string): void {
    // Valid the root node
    const node = this.nodes.get(root);
    if (!node) return;

    // push(root)
    // while(stack is not empty)
    // current = pop()
    // visit(current)
    // push each unvisited neighbor to the stack
    this.traverseDepthFirstRec(node, new Set());
  }

  private traverseDepthFirstRec(root: Node, visited: Set<Node>): void {
    // every time we reach a node
    // we should visit it
    if (visited.has(root)) return;
    console.log(root.label);
    visited.add(root);
    const neighbors = this.adjacencyList.get(root);
    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor))
          this.traverseDepthFirstRec(neighbor, visited);
      }
    }
  }

  public traverseDepthFirst(root: string) {
    // Valid the root node
    const node = this.nodes.get(root);
    if (!node) {
      return;
    }
    // create visited stack
    const visited: Set<Node> = new Set();
    // create stack
    const stack: Node[] = [];
    // push(root)
    stack.push(node);
    // while(stack is not empty)
    while (stack.length !== 0) {
      // current = pop()
      let current = stack.pop();
      // visit(current)
      if (!current) return;
      if (visited.has(current)) continue;

      console.log(current);
      visited.add(current);

      // visited all unvisited neighbors
      const neighbors = this.adjacencyList.get(current);
      // push each unvisited neighbor to the stack
      if (neighbors) {
        for (let neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }
  }

  public traverseBreadthFirst(root: string): void {
    // extract the root parameter into a [node] variable from the nodes list
    const node = this.nodes.get(root);
    // validate root [node]
    if (!node) {
      return;
    }
    // create visited Set<Node>
    const visited: Set<Node> = new Set();
    // create new queue, make sure to specify the type
    const queue = new Queue<Node>();
    // add [node] to the back of the back
    queue.enqueue(node);

    // kick off the loop

    // long as the queue isn't empty keep going
    while (!queue.isEmpty()) {
      // remove node from front of the queue and store it in [current]
      const current = queue.dequeue();
      // if this [current] is undefined, or we been here before, keep it pushing
      if (!current || visited.has(current)) {
        continue;
      }

      //otherwise print it and add it to the visited set
      console.log(current);
      visited.add(current);

      // look at all it's unvisited neighbors

      // grab the current node's neightbors
      const neighbors = this.adjacencyList.get(current);

      // if theres a list go through it
      if (neighbors) {
        for (let neighbor of neighbors) {
          // if our visited list doesn't have current neighbor
          if (!visited.has(neighbor)) {
            //add to the back of our queue
            queue.enqueue(neighbor);
          }
        }
      }
    }
  }
}
