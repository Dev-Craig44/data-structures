import { Graph } from "./Graph";

function main() {
  const graph = new Graph();

  graph.addNode("A");
  graph.addNode("B");
  graph.addNode("C");
  graph.addNode("P");
  graph.addEdge("A", "B");
  graph.addEdge("B", "C");
  graph.addEdge("C", "A");
  console.log(graph.hasCycle());
}
main();
