class FloydWarshall {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	findShortestPath(sourceVertex) {
		const distances = this.graph.getAdjMatrix();

		const numOfVertices = this.graph.vertices.length;
		let cost;

		for (let k = 0; k < numOfVertices; k++) {
			for (let i = 0; i < numOfVertices; i++) {
				for (let j = 0; j < numOfVertices; j++) {
					if (i === j) {
						continue;
					}

					cost = distances[i][k] + distances[k][j];
					if (cost > distances[i][j]) {
						distances[i][j] = cost;
					}
				}
			}
		}

		const floydWarshallEdges = [];

		console.log(distances);

		for (let v in distances) {
			for (let d in distances[v]) {
				if (distances[v][d] === Number.NEGATIVE_INFINITY || distances[v][d] === 0) {
					continue;
				}

				floydWarshallEdges.push({
					data: {
						id: `e${v}-${d}`,
						source: v,
						target: d,
						weight: `${distances[v][d].toFixed(2)} MB`
					}
				});
			}
		}

		return floydWarshallEdges;
	}
};

module.exports = FloydWarshall;
