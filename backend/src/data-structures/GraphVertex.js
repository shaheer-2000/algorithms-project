const GraphEdge = require("./GraphEdge");

class GraphVertex {
	constructor(key) {
		if (!key) {
			throw new Error('Missing required parameter id for GraphVertex');
		}

		this.key = key;
		this.edges = [];
		this.neighbours = {};
	}

	addEdge(destVertex, weight, label) {
		const newEdge = new GraphEdge(this, destVertex, weight, label);
		this.edges.push(newEdge);

		if (!this.neighbours[destVertex.key]) {
			this.neighbours[destVertex.key] = destVertex;
		}

		return newEdge;	
	}

	getMaxWeightEdge(destVertexKey) {
		destVertexKey = destVertexKey.toString();
		const targetEdges = destVertexKey === undefined ? this.edges : this.edges.filter((edge) => edge.destVertex.key === destVertexKey);

		if (targetEdges.length <= 0) {
			return Number.NEGATIVE_INFINITY;
		}

		let max = targetEdges[0].weight;
		let maxEdge = targetEdges[0];

		for (let edge of targetEdges) {
			if (max < edge.weight) {
				max = edge.weight;
				maxEdge = edge;
			}
		}

		return maxEdge;
	}

	hasNeighbour(destVertexKey) {
		destVertexKey = destVertexKey.toString();
		return this.neighbours[destVertexKey] !== undefined;
	}
};

module.exports = GraphVertex;
