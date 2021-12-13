const GraphVertex = require('./GraphVertex');
const GraphEdge = require('./GraphEdge');

class Graph {
	constructor() {
		this.vertices = {};
		this.edges = {};
	}

	addVertex(key) {
		if (!this.vertices[key]) {
			this.vertices[key] = new GraphVertex(key);
		}

		return this;
	}

	getVertex(key) {
		return this.vertices[key];
	}

	addEdge(srcKey, destKey, weight, label) {
		if (!this.vertices[srcKey] || !this.vertices[destKey]) {
			throw new Error('Missing required parameters for addEdge method');
		}

		if (!this.edges[srcKey]) {
			this.edges[srcKey] = {};
		}

		if (!this.edges[srcKey][destKey]) {
			this.edges[srcKey][destKey] = [];
		}

		this.edges[srcKey][destKey].push(new GraphEdge(this.vertices[srcKey], this.vertices[destKey], weight, label));

		return this;
	}

	getNeighbours(srcKey) {
		return Object.keys(this.edges[srcKey]);
	}

	getAdjMatrix() {
		const adjMatrix = {};

		for (let srcVertex in this.vertices) {
			if (!adjMatrix[srcVertex]) {
				adjMatrix[srcVertex] = {};
			}

			for (let destVertex in this.edges[srcVertex]) {
				adjMatrix[srcVertex][destVertex] = this.getMaxWeightEdge(this.edges[srcVertex][destVertex]);
			}
		}

		return adjMatrix;
	}

	getMaxWeightEdge(edges) {
		let max = edges[0].weight;

		for (let edge of edges) {
			if (edge.weight > max) {
				max = edge.weight;
			}
		}

		return max;
	}
};

module.exports = Graph;