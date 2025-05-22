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
