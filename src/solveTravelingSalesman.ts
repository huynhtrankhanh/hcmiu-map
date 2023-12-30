// main.ts

import { solveTSPDP } from './as/assembly/solveTSP.as';

export const solveTravelingSalesman = <T>(
  destinations: T[],
  weight: (a: T, b: T) => number
): T[] => {
  const n = destinations.length;
  const dp = new Uint32Array((1 << n) * n).fill(0x3f3f3f3f);

  const weights = new Uint32Array(n * n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      weights[i * n + j] = weight(destinations[i], destinations[j]);
    }
  }

  const log2 = new Uint32Array(1 << n).fill(0);
  for (let i = 0; i < n; i++) log2[1 << i] = i;

  solveTSPDP(weights, n, dp, log2);

  // Rest of the TypeScript code for reconstructing path
  const path = [];

  let currentVertex = -1;
  let currentMask = (1 << n) - 1;
  for (let i = 0; i < n; i++) {
    const total = dp[i * n + (1 << n) - 1];
    if (currentVertex === -1 || total < dp[currentVertex * n + currentMask]) {
      currentVertex = i;
    }
  }

  while (currentMask !== (1 << currentVertex)) {
    path.push(destinations[currentVertex]);
    let current = currentMask;

    let vertexPrevious = -1;
    let maskPrevious = -1;
    while (current) {
      const leastSetBit = current & -current;
      const previous = log2[leastSetBit];
      if (previous !== currentVertex) {
        const distance =
          dp[(currentMask & ~(1 << currentVertex)) * n + previous] +
          weights[previous * n + currentVertex];
        if (vertexPrevious === -1 || distance < dp[maskPrevious * n + vertexPrevious]) {
          vertexPrevious = previous;
          maskPrevious = currentMask & ~(1 << currentVertex);
        }
      }
      current -= leastSetBit;
    }

    currentVertex = vertexPrevious;
    currentMask = maskPrevious;
  }
  path.push(destinations[currentVertex]);
  path.reverse();

  return path;
};
