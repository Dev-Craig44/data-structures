import { Graph } from "./Graph";

function main() {
  const graph = new Graph();

  graph.addNode("A");
  graph.addNode("B");
  graph.addNode("C");
  graph.addEdge("A", "B");
  graph.addEdge("A", "C");
  graph.addEdge("B", "C");
  graph.print();
}
main();
