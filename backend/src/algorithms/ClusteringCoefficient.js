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
		const localCCs = [];
		let cc;

		for (let vertex of this.graph.vertices) {
			cc = this.getLocalCC(vertex);
			localCCs.push({
				key: vertex.key,
				cc
			});
			globalCC += cc;
		}

		return {
			global: globalCC / numOfVertices,
			locals: localCCs
		}
	}
};

module.exports = ClusteringCoefficient;
