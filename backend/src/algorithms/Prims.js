class Prims {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	findMST(sourceVertex) {
		const traversedVertices = {};
		let edgesIncludedInMST = 0;
		traversedVertices[sourceVertex] = true;

		const vertices = Object.keys(this.graph.vertices);
		const totalVertices = vertices.length;
		const adjMatrix = this.graph.getAdjMatrix();
		let max, src, dest;

		const mstGraph = {
			edges: []
		};

		while (edgesIncludedInMST < totalVertices - 1) {
			max = Number.NEGATIVE_INFINITY;
			for (let i of vertices) {
				if (traversedVertices[i]) {
					for (let j of vertices) {
						if (!traversedVertices[j] && adjMatrix[i][j]) {
							if (max < adjMatrix[i][j]) {
								max = adjMatrix[i][j];
								src = i;
								dest = j;
							}
						}
					}
				}
			}

			traversedVertices[dest] = true;
			edgesIncludedInMST++;
			mstGraph.edges.push({
				data: {
					id: `e${src}-${dest}`,
					source: src,
					target: dest,
					weight: `${adjMatrix[src][dest]} MB`
				}
			});
		}

		return mstGraph;
	}
};

module.exports = Prims;
