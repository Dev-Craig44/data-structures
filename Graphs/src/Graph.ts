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
    // loop through the the [keys] and [values] of the whole graph
    for (const [node, neighbors] of this.adjacencyList.entries()) {
      // long as this node has edges or connections
      if (neighbors.length > 0) {
        // use a comma and a space to join together each neighbors' label that we map through after we give it a nieghborLabels variable for all this to go into
        const neighborLabels = neighbors
          .map((neighbor) => neighbor.label)
          .join(", ");

        // print the current [node].label -> [neighborLabels]
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

  public topologicalSort() {
    // create the stack
    const stack: Node[] = [];

    // crate the visited Set
    const visited: Set<Node> = new Set();

    // what node should we pass here?
    // we should do a DFS, you want to make sure to visit every node in this graph
    // so make a for loop
    for (let [_, node] of this.nodes.entries()) {
      this.topologicalSortRec(node, visited, stack);
      // once we are done here, our stack is populated with our nodes in the reverse order, so all we have to do is to pop all our items from the stack and put them in a list.
      const sorted: string[] = [];

      // kick off the loop to reverse the order

      // long as the stack  has at least one thing
      while (stack.length > 0) {
        // extract popped node into [node]
        const node = stack.pop();
        // if there's an actual node
        if (node) {
          // push the label to the sorted list that takes a string[]
          sorted.push(node.label);
        }
      }
      // finally we return the sort list
      return sorted;
    }
  }

  private topologicalSortRec(
    node: Node,
    visited: Set<Node>,
    stack: Node[]
  ): void {
    // let's make sure we are not visiting the same node twice
    if (visited.has(node)) {
      return;
    }

    // otherwise let's mark this node as visited
    visited.add(node);

    // grab this nodes neighbors
    const neighbors = this.adjacencyList.get(node);
    // long as we neighbors
    if (neighbors) {
      // recursively, lets visit all the children of this node
      for (let neighbor of neighbors) {
        this.topologicalSortRec(neighbor, visited, stack);
        // once we visited all the children of a given node, then we're ready to push that node onto our stack
        // so we go really deep in our graph and find nodes that don't have any outgoing edges aka there's nobody depending on them (The Bottom)
        // so we add these to our stack first, and then when we pop our stack these are going to be the last items in the sorted list
      }
    }
    stack.push(node);
  }
}
