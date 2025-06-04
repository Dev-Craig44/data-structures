import { Graph } from "./Graph";

function main() {
  const graph = new Graph();

  graph.addNode("X");
  graph.addNode("A");
  graph.addNode("B");
  graph.addNode("P");
  graph.addEdge("X", "A");
  graph.addEdge("X", "B");
  graph.addEdge("A", "P");
  graph.addEdge("B", "P");
  const list = graph.topologicalSort();
  console.log(list);
}
main();
