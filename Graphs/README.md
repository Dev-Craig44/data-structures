# Graphs

Graphs are powerful data structures used to model relationships in social networks, transportation systems, dependency management, and more. This guide covers key concepts, representations, traversal algorithms, and practical exercises for mastering graphs.

---

## Key Concepts

- **Graph:** A collection of nodes (vertices) connected by edges.
- **Adjacent Nodes:** Two nodes connected by an edge.
- **Directed Graph:** Edges have a direction (from one node to another).
- **Weighted Edge:** Edges can have weights (cost, distance, etc.).

---

## Graph Representations

### Adjacency Matrix

A 2D array where `matrix[i][j]` indicates the presence (and possibly weight) of an edge from node `i` to node `j`.

#### Pros & Cons

- **Space Complexity:**
  - `O(V²)` for `V` nodes.
  - Example: 1,000 nodes → 1,000,000 entries.
- **Operations:**

  | Operation       | Complexity | Notes                                    |
  | --------------- | ---------- | ---------------------------------------- |
  | Add Node        | O(V²)      | New matrix with extra row/column         |
  | Remove Node     | O(V²)      | Allocate smaller matrix and copy entries |
  | Add/Remove Edge | O(1)       | Direct update (after finding indices)    |
  | Query Edge      | O(1)       | Lookup in matrix                         |
  | Find Neighbors  | O(V)       | Iterate through row                      |

#### Visual Summary

```text
Adjacency Matrix Stats
----------------------
Space:         O(V²)
Add Edge:      O(1)
Remove Edge:   O(1)
Query Edge:    O(1)
Find Neighbors:O(V)
Add Node:      O(V²)
Remove Node:   O(V²)
```

> **Tip:** Use `V` (vertices) and `E` (edges) for complexity analysis.

---

### Adjacency List

An array or map where each node stores a list of its neighbors.

- **Space Complexity:** `O(V + E)` (efficient for sparse graphs)
- **Dense Graphs:** Up to `O(V²)` edges.

#### Operations

| Operation       | Complexity | Notes                                                                |
| --------------- | ---------- | -------------------------------------------------------------------- |
| Add Node        | O(1)       | Add entry to list/map                                                |
| Remove Node     | O(V)       | Remove node and all references                                       |
| Add/Remove Edge | O(K)       | `K` = number of neighbors; O(1) for multigraphs (no duplicate check) |
| Query Edge      | O(K)       | Search neighbor list                                                 |
| Find Neighbors  | O(K)       | Direct access                                                        |

- `K` = number of neighbors (≤ V).

---

### Matrix vs List: Summary

| Operation          | Adjacency Matrix | Adjacency List |
| ------------------ | :--------------: | :------------: |
| **Space**          |      O(V²)       |    O(V + E)    |
| **Add Edge**       |       O(1)       |      O(K)      |
| **Query Edge**     |       O(1)       |      O(K)      |
| **Remove Edge**    |       O(1)       |      O(K)      |
| **Find Neighbors** |       O(V)       |      O(K)      |
| **Add Node**       |      O(V²)       |      O(1)      |
| **Remove Node**    |      O(V²)       |     O(V²)      |

- **Matrix:** Fast edge operations, high space cost for sparse graphs.
- **List:** Space-efficient for sparse graphs, fast neighbor access.

---

## Example: Shortest Path

Graphs can model cities (nodes) and roads (edges with weights as distances). Algorithms like Dijkstra’s use these representations to find shortest paths.

---

## Exercise: Graph Class Design

Design a `Graph` class with:

- **Private Inner Class:** `Node` with a `label: string`.
- **Public API:**
  - `addNode(label: string): void`
  - `removeNode(label: string): void`
  - `addEdge(from: string, to: string): void`
  - `removeEdge(from: string, to: string): void`
  - `print(): void`  
    _Format:_ `A is connected to [B, C]`

> _Note: In real applications, visualization is handled outside the graph class._

---

## Traversal Algorithms

### Depth-First Search (DFS)

- Explores as far as possible along each branch before backtracking.
- Implemented recursively or with an explicit stack.
- **Use cases:** Cycle detection, pathfinding, topological sort.

**Example (start at A):**  
`A → B → D → C`

### Breadth-First Search (BFS)

- Explores all neighbors at the current depth before moving deeper.
- Uses a queue.
- **Use cases:** Shortest path in unweighted graphs, level-order traversal.

**Example (start at A):**  
`A → B → C → D`

---

### Traversal Visuals

#### DFS (from C):

```
[C]
↓
[A]
↓
[B]
↓
[E]
↓
[D]
```

#### BFS (from C):

```
[C]
↓
[A, B, D]
↓
[A]
↓
[B, D, E]
↓
[B]
↓
[D, E]
↓
[D]
↓
[E]
```

---

## Iterative Traversal

### Iterative DFS

- Use a stack to mimic the call stack.
- Push starting node, pop and visit, push unvisited neighbors.

### Iterative BFS

- Use a queue.
- Enqueue starting node, dequeue and visit, enqueue unvisited neighbors.

**Example BFS Steps:**

```
Queue: [A]
Visited: A
Queue: [B, C]
Visited: A, B
Queue: [C, D]
Visited: A, B, C
Queue: [D]
Visited: A, B, C, D
```

Order: `A → B → C → D`

---

## Exercise: Topological Sorting

Used to order tasks/projects with dependencies (DAGs only).

**Example Dependency Graph:**

```
     -> A ->
X             P
     -> B ->
```

- **P** depends on **A** and **B**; both depend on **X**.
- Valid build orders: `XABP`, `XBAP`, etc.

**Algorithm:**

- Use DFS.
- After visiting all descendants, push node to a stack.
- Pop stack for build order.

**Exercise:**  
Implement `topologicalSort(): List<string>` in your `Graph` class.

---

## Exercise: Cycle Detection

Topological sort only works on DAGs. To detect cycles:

### DFS with Node States

- **All:** Not started (white)
- **Visiting:** In current DFS path (gray)
- **Visited:** Fully explored (black)

**Cycle exists if:**  
During DFS, you revisit a node in the "visiting" set.

**Example:**

- `A → B → C → A` forms a cycle.

**Exercise:**  
Implement `hasCycle(): boolean` in your `Graph` class.

---

## Summary Table: Node States

| State    | Meaning                               | Color (variant) |
| -------- | ------------------------------------- | --------------- |
| All      | Not yet started                       | White           |
| Visiting | In current DFS path (recursion stack) | Gray            |
| Visited  | Fully explored                        | Black           |

> **Tip:**  
> Cycle detection is essential for algorithms like topological sort.

---

## Further Reading

- [Graph Theory (Wikipedia)](https://en.wikipedia.org/wiki/Graph_theory)
- [Adjacency Matrix vs List](https://www.geeksforgeeks.org/graph-and-its-representations/)
- [DFS and BFS Visualizations](https://visualgo.net/en/dfsbfs)

---

Happy graph coding!
