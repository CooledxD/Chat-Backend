import cluster from "cluster"
import { availableParallelism } from "os"

const numCPUs = availableParallelism()

cluster.setupPrimary({
  exec: `${process.cwd()}/src/server.js`,
})

for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}

cluster.on("exit", () => {
  cluster.fork()
})