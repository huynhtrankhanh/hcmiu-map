export const solveTravelingSalesman = <T>(
  destinations: T[],
  weight: (a: T, b: T) => number
) => {
  const mapDestinationToIndex = new Map<T, number>();
  for (const [index, x] of destinations.entries()) {
    mapDestinationToIndex.set(x, index);
  }

  const n = destinations.length;
  const dp = Array.from(
    { length: (1 << n) * n },
    (): { distance: number; trace: [number, number] } => ({
      distance: Infinity,
      trace: [-1, -1],
    })
  );

  const log2 = Array.from({ length: 1 << n }, () => 0);
  for (let i = 0; i < n; i++) log2[1 << i] = i;

  const get = (vertex: number, visited: number) => dp[visited * n + vertex];

  for (let mask = 0; mask < 1 << n; mask++) {
    for (let i = 0; i < n; i++) {
      let current = (1 << n) - 1 - mask;
      const saved = get(i, mask);
      while (current) {
        const leastSetBit = current & -current;
        const previous = log2[leastSetBit];
        const distance =
          get(previous, mask & ~(1 << i)).distance +
          weight(destinations[previous], destinations[i]);
        if (distance < saved.distance) {
          saved.distance = distance;
          saved.trace = [previous, mask & ~(1 << i)];
        }
        current -= leastSetBit;
      }
    }
  }

  let currentVertex = -1;
  let currentMask = (1 << n) - 1;
  for (let i = 0; i < n; i++) {
    const total = get(i, (1 << n) - 1).distance;
    if (
      currentVertex === -1 ||
      total < get(currentVertex, currentMask).distance
    ) {
      currentVertex = i;
    }
  }

  const path: T[] = [];

  if (currentVertex !== -1) {
    path.push(destinations[currentVertex]);
    [currentVertex, currentMask] = get(currentVertex, currentMask).trace;
  }
  path.reverse();

  return path;
};
