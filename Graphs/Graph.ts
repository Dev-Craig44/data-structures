import { Node } from "./Node";

// #1
export class Graph {
  // there is a data structure we can use to store nodes is a List
  // this List structure is bad because if the item we're looking for is at the end of the list, we have to traverse the entire list to find it

  // private List<Node> nodes = [];

  // we can use a Hash Table to store nodes, which allows us to access them in constant time O(1)
  // in typescript, a Hash Table is implemented as a Map
  private nodes: Map<string, Node> = new Map();
  //   #5
  private adjacencyList: Map<Node, Node[]> = new Map();

  // #4
  public addNode(label: string): void {
    // When adding a node, first check if it already exists in the graph using the {has} method of the Map.
    if (!this.nodes.has(label)) {
      // If the node doesn't exist, create a new Node and add it to the Map.
      const node = new Node(label);
      this.nodes.set(label, node);
      //   #5
      // It's best practice to also add an entry for this node in the adjacency list right away.
      // This way, every node always has an initialized (empty) array for its neighbors.
      // This avoids having to check for the node's existence in the adjacency list later (e.g., in addEdge),
      // and prevents errors like trying to push to an undefined array.
      this.adjacencyList.set(node, []);
    }
  }

  public addEdge(from: string, to: string): void {
    // we grab the the from node and place it in a [fromNode] variable using the {get} method of the Map
    const fromNode = this.nodes.get(from);
    // check if the fromNode exists, if it doesn't, we throw an error
    if (!fromNode) {
      throw new Error(`Node with label ${from} does not exist.`);
    }
    // do the same for the to node
    const toNode = this.nodes.get(to);
    if (!toNode) {
      throw new Error(`Node with label ${to} does not exist.`);
    }

    // now we need a adajcency list to store the relationship between the nodes in the list
    // we should be able to quickly access this fromNode, so we going to use a Hash Table
    // we can use a Map to store the adjacency list #5

    // get the [fromNode] from the adjacency list, and here we would get and array object where we can {push} the [toNode] into
    this.adjacencyList.get(fromNode)?.push(toNode);

    // above is a direct graph, if we want to make it undirected, we need to add the [fromNode] to the [toNode] adjacency list as well

    // this.adjacencyList.get(toNode)?.push(fromNode);
  }

  public print(): void {
    // first we nee to grab the keys of the adjacency list, which are the nodes by using the {entries} method of the Map
    // then we also need to grab the values of the adjacency list, which are the neighbors of the nodes by destructuring the entries into [node, neighbors]
    for (const [node, neighbors] of this.adjacencyList.entries()) {
      if (neighbors.length > 0) {
        // right here we take the neighbors array and map it to an array of labels, then join them into a string
        const neighborLabels = neighbors
          .map((neighbor) => neighbor.label)
          .join(", ");
        console.log(`${node.label} -> ${neighborLabels}`);
      }
    }
  }
}
