import { liftPositions } from "./liftPositions";

function shortestPath(
  graph: [number, number][],
  start: number,
  end: number
): number[] {
  const adjacencyList: Map<number, number[]> = new Map();

  // Build the adjacency list
  for (const [u, v] of graph) {
    if (!adjacencyList.has(u)) adjacencyList.set(u, []);
    if (!adjacencyList.has(v)) adjacencyList.set(v, []);

    adjacencyList.get(u)!.push(v);
    adjacencyList.get(v)!.push(u);
  }

  const n = graph.map(([a, b]) => Math.max(a, b)).reduce((accumulated, current) => Math.max(accumulated, current)) + 1;

  const queue: number[] = [start];
  const visited: Set<number> = new Set([start]);
  const trace: number[] = Array.from({ length: n }, () => -1);

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

function interfloorShortestPath(
  floor1Graph: [number, number][],
  floor2Graph: [number, number][],
  source: number,
  destination: number
): [number[], number[]] | undefined {
  let legs: [number[], number[]] | undefined;
  for (const lift of Object.values(liftPositions)) {
    const leg1 = shortestPath(floor1Graph, source, lift);
    const leg2 = shortestPath(floor2Graph, lift, destination);
    if (legs === undefined) legs = [leg1, leg2];
    else if (leg1.length + leg2.length < legs[0].length + legs[1].length)
      legs = [leg1, leg2];
  }
  return legs;
}

export { shortestPath, interfloorShortestPath };
