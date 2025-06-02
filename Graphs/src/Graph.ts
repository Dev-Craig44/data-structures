import { Node } from "./Node";

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

  public traversalDepthFirst(root: string): void {
    // Valid the root node
    const node = this.nodes.get(root);
    if (!node) return;

    // push(root)
    // while(stack is not empty)
    // current = pop()
    // visit(current)
    // push each unvisited neighbor to the stack
    this.traverseDepthFirst(node, new Set());
  }

  private traverseDepthFirst(root: Node, visited: Set<Node>): void {
    // every time we reach a node
    // we should visit it
    if (visited.has(root)) return;
    console.log(root.label);
    visited.add(root);
    const neighbors = this.adjacencyList.get(root);
    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) this.traverseDepthFirst(neighbor, visited);
      }
    }
  }
}
