class ClusteringCoefficient {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	// CC = Clustering Co-efficient
	getLocalCC(vi) {
		let k = 0, n = 0;

		for (let vj in vi.neighbours) {
			for (let vk in vi.neighbours) {
				if (vj === vk) {
					continue;
				}

				if (vk in vi.neighbours[vj].neighbours) {
					n++;
				}
			}

			k++;
		}

		return Math.abs(n) / (k * (k - 1));
	}

	getGlobalCC() {
		let globalCC = 0, numOfVertices = this.graph.vertices.length;

		for (let vertex of this.graph.vertices) {
			globalCC += this.getLocalCC(vertex);
		}

		return globalCC / numOfVertices;
	}
};

module.exports = ClusteringCoefficient;
