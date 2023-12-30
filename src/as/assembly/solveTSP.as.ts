// solveTSP.as.ts

// AssemblyScript code for dynamic programming part

export function solveTSPDP(weights: Uint32Array, n: number, dp: Uint32Array, log2: Uint32Array): void {
  for (let mask = 0; mask < 1 << n; mask++) {
    for (let i = 0; i < n; i++) {
      if (mask === (1 << i)) {
        dp[mask * n + i] = 0;
      }

      let current = mask;
      while (current) {
        const leastSetBit = current & -current;
        const previous = log2[leastSetBit];
        if (previous !== i) {
          const distance =
            dp[previous * n + mask & ~(1 << i)] +
            weights[previous * n + i];
          if (distance < dp[mask * n + i]) {
            dp[mask * n + i] = distance;
          }
        }
        current -= leastSetBit;
      }
    }
  }
}
