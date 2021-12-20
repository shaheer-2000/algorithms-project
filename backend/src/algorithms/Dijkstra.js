class Dijkstra {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	findParent(vertex, parents) {
		if (parents[vertex] === vertex) {
			return vertex;
		}

		return this.findParent(parents[vertex], parents);
	}

	findMaxVertex(distances, visited) {
		let maxVertex;

		for (let d in distances) {
			if (!visited[d]) {
				maxVertex = d;
			}
		}

		for (let d in distances) {
			if (!visited[d] && distances[maxVertex] < distances[d]) {
				maxVertex = d;
			}
		}

		return maxVertex.toString();
	}

	findShortestPath(sourceVertex) {
		const distances = {};
		const visited = {};

		for (let vertex of this.graph.vertices) {
			distances[vertex.key] = Number.NEGATIVE_INFINITY;
		}

		distances[sourceVertex] = 0;

		let maxVertex, cost;
		let cVertex, nEdge;
		for (let v in distances) {
			maxVertex = this.findMaxVertex(distances, visited);
			cVertex = this.graph.verticesMap[maxVertex];
			visited[maxVertex] = true;

			for (let vi in distances) {
				if (visited[vi] || !cVertex.hasNeighbour(vi)) {
					continue;
				}

				nEdge = cVertex.getMaxWeightEdge(vi);
				cost = distances[cVertex.key] + nEdge.weight;

				if (distances[vi] < cost) {
					distances[vi] = cost;
				}
			}
		}

		const dijkstraEdges = [];

		for (let d in distances) {
			if (sourceVertex.toString() === d) {
				continue;
			}

			dijkstraEdges.push({
				data: {
					id: `e${sourceVertex}-${d}`,
					source: sourceVertex,
					target: d,
					weight: `${distances[d].toFixed(2)} MB`
				}
			})
		}

		return dijkstraEdges;
	}
};

module.exports = Dijkstra;
