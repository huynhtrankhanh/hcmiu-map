function shortestPath(graph: [number, number][], start: number, end: number): number[] {
  const adjacencyList: Map<number, number[]> = new Map();

  // Build the adjacency list
  for (const [u, v] of graph) {
    if (!adjacencyList.has(u)) adjacencyList.set(u, []);
    if (!adjacencyList.has(v)) adjacencyList.set(v, []);

    adjacencyList.get(u)!.push(v);
    adjacencyList.get(v)!.push(u);
  }

  const queue: number[] = [start];
  const visited: Set<number> = new Set([start]);
  const trace: number[] = Array.from({ length: adjacencyList.size }, () => -1);

  while (queue.length > 0) {
    const current = queue.shift()!;

    for (const neighbor of adjacencyList.get(current)!) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        trace[neighbor] = current;
      }
    }
  }

  // Reconstruct the shortest path
  const path: number[] = [];
  let current = end;

  while (current !== -1) {
    path.unshift(current);
    current = trace[current];
  }

  return path;
}

export { shortestPath }