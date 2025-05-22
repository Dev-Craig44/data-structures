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
