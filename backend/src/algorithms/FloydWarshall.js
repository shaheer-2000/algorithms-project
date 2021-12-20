class FloydWarshall {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	inverseAdjMatrix(adjMatrix) {
		for (const i in adjMatrix) {
			for (const j in adjMatrix[i]) {
				if (adjMatrix[i][j] === Number.NEGATIVE_INFINITY) {
					adjMatrix[i][j] = Number.POSITIVE_INFINITY;
				} else {
					adjMatrix[i][j] = (1 / adjMatrix[i][j]);
				}
			}
		}

		return adjMatrix;
	}

	findShortestPath(sourceVertex) {
		const distances = this.inverseAdjMatrix(this.graph.getAdjMatrix());

		const numOfVertices = this.graph.vertices.length;
		let cost;

		for (let k = 0; k < numOfVertices; k++) {
			for (let i = 0; i < numOfVertices; i++) {
				for (let j = 0; j < numOfVertices; j++) {
					if (i === j) {
						continue;
					}

					cost = distances[i][k] + distances[k][j];
					if (cost < distances[i][j]) {
						distances[i][j] = cost;
					}
				}
			}
		}

		const floydWarshallEdges = [];

		const inversedDistances = this.inverseAdjMatrix(distances);

		for (let v in inversedDistances) {
			for (let d in inversedDistances[v]) {
				if (inversedDistances[v][d] === Number.POSITIVE_INFINITY || inversedDistances[v][d] === 0) {
					continue;
				}

				floydWarshallEdges.push({
					data: {
						id: `e${v}-${d}`,
						source: v,
						target: d,
						weight: `${inversedDistances[v][d].toFixed(2)} MB`
					}
				});
			}
		}

		return floydWarshallEdges;
	}
};

module.exports = FloydWarshall;
