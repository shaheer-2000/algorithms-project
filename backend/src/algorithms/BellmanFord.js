class BellmanFord {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	findShortestPath(sourceVertex) {
		const distances = {};

		for (let vertex of this.graph.vertices) {
			distances[vertex.key] = Number.POSITIVE_INFINITY;
		}

		distances[sourceVertex] = 0;

		let cost;
		let cVertex, dVertex;

		for (let i = 0, len = this.graph.vertices.length; i < len - 1; i++) {
			for (let edge of this.graph.edges) {
				cVertex = edge.srcVertex;
				dVertex = edge.destVertex;

				cost = distances[cVertex.key] + (1 / edge.weight);
				console.log(cost);
				if (distances[cVertex.key] !== Number.POSITIVE_INFINITY && distances[dVertex.key] > cost) {
					distances[dVertex.key] = cost;
				}
			}
		}

		const bellmanFordEdges = [];

		for (let d in distances) {
			if (sourceVertex.toString() === d) {
				continue;
			}

			bellmanFordEdges.push({
				data: {
					id: `e${sourceVertex}-${d}`,
					source: sourceVertex,
					target: d,
					weight: `${(1 / distances[d]).toFixed(2)} MB`
				}
			});
		}

		return bellmanFordEdges;
	}
};

module.exports = BellmanFord;
