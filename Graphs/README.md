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
