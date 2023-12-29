export const solveTravelingSalesman = <T>(destinations: T[], weight: (a: T, b: T) => number) => {
    const mapDestinationToIndex = new Map<T, number>()
    for (const [index, x] of destinations.entries()) {
        mapDestinationToIndex.set(x, index)
    }

    const n = destinations.length
    const dp = Array.from({ length: (1 << n) * n }, () => Infinity)

    const get = (vertex: number, visited: number) => dp[visited * n + vertex]
    const set = (vertex: number, visited: number, value: number) => { dp[visited * n + vertex] = value }

    for (let mask = 0; mask < (1 << n); mask++) {
        for (let i = 0; i < n; i++) {

        }
    }
}