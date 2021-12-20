const GraphVertex = require('./GraphVertex');
const GraphEdge = require('./GraphEdge');

class Graph {
	constructor() {
		this.verticesMap = {};
		this.vertices = [];
		this.edgesMap = {};
		this.edges = [];
		this.adjMatrix = {};
		this.adjMatrixGenned = false;
	}

	addVertex(key) {
		if (!this.verticesMap[key]) {
			const vertex = new GraphVertex(key);
			this.verticesMap[key] = vertex;
			this.vertices.push(vertex);
		}

		return this;
	}

	getVertex(key) {
		return this.verticesMap[key];
	}

	addEdge(srcKey, destKey, weight, label) {
		srcKey = srcKey.toString();
		destKey = destKey.toString();
		const srcVertex = this.getVertex(srcKey);
		const destVertex = this.getVertex(destKey);

		if (!srcVertex || !destVertex) {
			throw new Error('Missing required parameters for addEdge method');
		}

		const newEdge = srcVertex.addEdge(destVertex, weight, label);
		this.edges.push(newEdge);
		if (!this.edgesMap[srcKey]) {
			if (!this.edges[srcKey][destKey]) {
				this.edges[srcKey][destKey] = newEdge;
			}
		}

		return this;
	}

	getSortedEdges() {
		const sortedEdges = [...this.edges];
		return sortedEdges.sort((a, b) => b.weight - a.weight);
	}

	getAdjMatrix() {
		if (!this.adjMatrixGenned) {
			this.adjMatrixGenned = true;
			this.genAdjMatrix();
		}

		const psuedoAdjMatrix = {};
		for (let i in this.adjMatrix) {
			if (!psuedoAdjMatrix[i]) {
				psuedoAdjMatrix[i] = {};
			}

			for (let j in this.adjMatrix[i]) {
				psuedoAdjMatrix[i][j] = this.adjMatrix[i][j];
			}
		}

		return psuedoAdjMatrix;
	}

	genAdjMatrix() {
		let ei;
		for (let vi of this.vertices) {
			if (!this.adjMatrix[vi.key]) {
				this.adjMatrix[vi.key] = {};
			}

			for (let vj of this.vertices) {
				if (!this.adjMatrix[vi.key][vj.key]) {
					if (vi.key === vj.key) {
						this.adjMatrix[vi.key][vj.key] = 0;
					} else {
						ei = vi.getMaxWeightEdge(vj.key);
						this.adjMatrix[vi.key][vj.key] = ei === Number.NEGATIVE_INFINITY ? Number.NEGATIVE_INFINITY : ei.weight;
					}
				}
			}
		}

		return this.adjMatrix;
	}
};

module.exports = Graph;