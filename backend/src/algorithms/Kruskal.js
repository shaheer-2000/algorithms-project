class Kruskal {
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

	findMST(sourceVertex) {
		const kruskalEdges = [];
		const sortedEdges = this.graph.getSortedEdges();
		const parents = this.graph.vertices.map((vertex) => vertex.key);

		let i = 0;
		let srcParent, destParent, currEdge;

		while (kruskalEdges.length < (parents.length - 1)) {
			currEdge = sortedEdges[i++];
			console.log(currEdge, i, sortedEdges.length);
			srcParent = this.findParent(currEdge.srcVertex.key, parents);
			destParent = this.findParent(currEdge.destVertex.key, parents);

			if(srcParent != destParent) {
				kruskalEdges.push(currEdge.toParsedFormat());
				parents[srcParent] = destParent;
				console.log(parents);
			}
		}

		return kruskalEdges;
	}
};

module.exports = Kruskal;
