# Graphs

## Key Concepts

- **Graphs** are used in social networks, transportation systems, and many other applications.
- When two nodes are connected, they are called **adjacent**.
- If the connections (**edges**) have a direction, the graph is called a **directed graph**.
- Edges can also have **weights**, representing the strength or cost of a connection.

## Example

- Graphs can be used to find the **shortest path** between two nodes.
- For example, in a map of cities, **nodes** represent cities and **edge weights** can represent travel distances.

- One way to represent the edges in a graph is by using a **matrix**, specifically a two-dimensional array.
- If a node in a given row is connected to a node in a given column, this is called an **adjacency matrix**.
- The main drawback of this approach is the amount of space required to store the matrix.
- If we have _n_ nodes, the space complexity is **O(n²)**.

## Adjacency Matrix: Pros & Cons

### Space Complexity

- A graph with **1,000 nodes** needs a matrix with **1,000 × 1,000 = 1,000,000 entries**.
- **Space:** `O(V²)`

---

### Operations & Their Complexities

| Operation          | Complexity | Notes                                                                           |
| ------------------ | ---------- | ------------------------------------------------------------------------------- |
| **Add Node**       | O(V²)      | Must create a new matrix with an extra row/column and copy all entries          |
| **Remove Node**    | O(V²)      | Allocate a smaller matrix and copy entries                                      |
| **Add Edge**       | O(1)       | Directly update the matrix (after finding node indices, e.g., via a hash table) |
| **Remove Edge**    | O(1)       | Same as adding an edge                                                          |
| **Query Edge**     | O(1)       | Lookup in the matrix                                                            |
| **Find Neighbors** | O(V)       | Iterate through the entire row for a node                                       |

---

### Visual Summary

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

> **Tip:** In graph problems, we usually use `V` (vertices/nodes) and `E` (edges) to describe time and space complexity.

## Adjacency List

- Another way to represent the edges in a graph is by using an **adjacency list**, which is typically an array (or map) of linked lists (or dynamic arrays).
- With an adjacency list, we only store the edges that actually exist in the graph.
- **Space Complexity:** Only one entry per edge is needed, so the space complexity is **O(V + E)**, where `V` is the number of vertices and `E` is the number of edges.

### Worst Case: Dense Graph

- In a **dense graph**, every node is connected to every other node.
- The total number of edges:  
   \( E = V \times (V - 1) \) (for a directed graph, without self-loops)
- So, \( E = V^2 - V \)
- For complexity analysis, we focus on the fastest-growing term, so we drop the `-V` and say the space complexity is **O(V²)** in the worst case.
- In general, **space complexity** is **O(V + E)**, but for dense graphs, this becomes **O(V²)**.

---

### Operations & Their Complexities

| Operation          | Complexity | Notes                                                                                 |
| ------------------ | ---------- | ------------------------------------------------------------------------------------- |
| **Add Node**       | O(1)       | Add a new entry to the adjacency list                                                 |
| **Remove Node**    | O(V)       | Remove the node and all references to it in other lists                               |
| **Add Edge**       | O(K)       | `K` is the number of neighbors; need to check for duplicates unless it's a multigraph |
| **Remove Edge**    | O(K)       | Remove from the list of neighbors                                                     |
| **Query Edge**     | O(K)       | Search through the neighbors                                                          |
| **Find Neighbors** | O(K)       | Direct access to the list of neighbors                                                |

- For **multigraphs** (where multiple edges between the same nodes are allowed), you can add edges in **O(1)** time since you don't need to check for duplicates.

#### Notes:

- `K` is the number of neighbors (edges) for a given node. In the worst case, `K = V`.
- **Removing a node** requires removing its entry and ensuring no other node points to it, which is **O(V)**.
- **Adding an edge**: If you need to check for duplicates, it's **O(K)**; otherwise, for multigraphs, it's **O(1)**.
- **Removing or querying an edge**: Also **O(K)**, as you may need to search the list.

---

### Matrix vs List: Summary Table

| Operation          | Adjacency Matrix | Adjacency List |
| ------------------ | :--------------: | :------------: |
| **Space**          |      O(V²)       |    O(V + E)    |
| **Add Edge**       |       O(1)       |      O(K)      |
| **Query Edge**     |       O(1)       |      O(K)      |
| **Remove Edge**    |       O(1)       |      O(K)      |
| **Find Neighbors** |       O(V)       |      O(K)      |
| **Add Node**       |      O(V²)       |      O(1)      |
| **Remove Node**    |      O(V²)       |     O(V²)      |

- **Matrix**: Faster for adding, removing, and querying edges, but uses more space, especially for sparse graphs.
- **List**: More space-efficient for sparse graphs and faster for finding neighbors.

---

> All time complexities above are for the average case. In the **worst case** (dense graph), adjacency list operations involving all neighbors can degrade to **O(V²)**.

## Exercise

### Graph Class Design #1

Design a `Graph` class with the following requirements:

#### Node (Private Inner Class) #2

- **Field:** `label: string` #3
  - The label represents the node's identity.
  - In real applications, this could be an object (e.g., a city, person, or job), but for simplicity, use a string.

#### Graph (Public API)

- **addNode(label: string): void** #4
  - Adds a node with the given label to the graph.
  - Internally, wraps the label in a node object. This implementation detail is hidden from users.
- **removeNode(label: string): void**
  - Removes the node with the specified label from the graph.
- **addEdge(from: string, to: string): void**
  - Adds an edge between the nodes with the given labels.
- **removeEdge(from: string, to: string): void**
  - Removes the edge between the specified nodes.
- **print(): void** #6
  - Prints the graph in the format:  
     `A is connected to [B, C]`  
     `B is connected to [A]`
  - Note: Ideally, the `print` method should not be part of the graph class, as the graph should not be concerned with its representation. In real applications, visualization would be handled elsewhere.

---

**Instructions:**

- Create a `Graph` class.
- Implement a private `Node` class inside `Graph` (not visible to users).
- The `Node` class should have a `label` field of type `string`.
- Use the public methods above to manage nodes and edges.

## Traversal Algorithms

Graph traversal is the process of visiting all the nodes in a graph, starting from a given node. Unlike trees, graphs do not have a designated root node, so traversal can begin from any node. The nodes visited during traversal are those reachable from the starting node.

**Real-world example:**  
Finding all people who are directly or indirectly connected to a person in a social network graph.

### Visual Example

Suppose we have the following graph:

```text
A --- B
|     |
C --- D
```

- **Nodes:** A, B, C, D
- **Edges:** (A-B), (A-C), (B-D), (C-D)

### Depth-First Search (DFS)

- Starts at a given node and explores as far as possible along each branch before backtracking.
- Can be implemented using recursion (call stack) or an explicit stack (iteration).
- Useful for tasks like detecting cycles, pathfinding, and topological sorting.

**DFS Example (starting from A):**

```text
Visit: A → B → D → C
```

### Breadth-First Search (BFS)

- Starts at a given node and explores all its neighbors before moving to the next level of neighbors.
- Implemented using a queue to keep track of nodes to visit next.
- Useful for finding the shortest path in unweighted graphs and for level-order traversal.

**BFS Example (starting from A):**

```text
Visit: A → B → C → D
```

**Key Points:**

- In trees, traversal always starts from the root, and all nodes are reachable from it.
- In graphs, there may be multiple connected components, so traversal from a node only visits nodes in its component.

---

```
[C]           // Start from node C
↓
[A]           // C is connected to A
↓
[B]           // A is connected to B (excluding already visited nodes)
↓
[E]           // B is connected to E (excluding already visited nodes)
↓
[D]           // E is connected to D (excluding already visited nodes)
```

This sequence shows the order in which nodes are discovered and visited during a depth-first traversal starting from node C.

Here’s a clearer version of the content:

```
[C]           // Start from node C
↓
[A, B, D]     // C is connected to A, B, D
↓
[A]           // Visit A next
↓
[B, D, E]     // A is connected to B, D, E (excluding already visited nodes)
↓
[B]           // Visit B next
↓
[D, E]        // B is connected to D, E (excluding already visited nodes)
↓
[D]           // Visit D next
↓
[E]           // D is connected to E (excluding already visited nodes)
↓
[E]           // Visit E next (no new neighbors)
```

This sequence shows the order in which nodes are discovered and visited during a breadth-first traversal starting from node C.

**Problem:**  
I made a mistake in my commit message and had already pushed my branch to the remote. When I fixed the message with my `git fixmsg` alias, this created two different versions: one on the remote and one on my machine. To resolve this, I created a `git pushforce` alias that uses `git push --force-with-lease origin HEAD` to make the remote reflect what's on my machine. This solved the problem.
