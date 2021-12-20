class Boruvka {
	constructor(graph) {
		if (!graph) {
			throw new Error('Missing required parameter graph in Prims');
		}

		this.graph = graph;
	}

	find(subsets, i) {
		console.log(i, subsets[i]);
		if (subsets[i].parent !== i) {
			subsets[i].parent = this.find(subsets, subsets[i].parent);
		}

		return subsets[i].parent;
	}

	union(subsets, x, y) {
		const xRoot = this.find(subsets, x);
		const yRoot = this.find(subsets, y);

		if (subsets[xRoot].rank < subsets[yRoot].rank) {
			subsets[xRoot].parent = yRoot;
		} else if (subsets[xRoot].rank > subsets[yRoot].rank) {
			subsets[yRoot].parent = xRoot;
		} else {
			subsets[yRoot].parent = xRoot;
			subsets[xRoot].rank++;
		}
	}

	findMST(sourceVertex) {
		const subsets = {};
		let maxEdges = {};
		const boruvkaMSTEdges = [];

		for (const vertex of this.graph.vertices) {
			subsets[vertex.key] = {
				parent: vertex.key,
				rank: 0
			};
			maxEdges[vertex.key] = -1;
		}

		let numOfTrees = this.graph.vertices.length;

		while (numOfTrees > 1) {
			for (let mE in maxEdges) {
				maxEdges[mE] = -1;
			}

			for (let i = 0, len = this.graph.edges.length; i < len; i++) {
				let setOne = this.find(subsets, this.graph.edges[i].srcVertex.key);
				let setTwo = this.find(subsets, this.graph.edges[i].destVertex.key);

				if (setOne === setTwo) {
					continue;
				} else {
					if (maxEdges[setOne] === -1 || this.graph.edges[maxEdges[setOne]].weight < this.graph.edges[i].weight) {
						maxEdges[setOne] = i;
					}

					if (maxEdges[setTwo] === -1 || this.graph.edges[maxEdges[setTwo]].weight < this.graph.edges[i].weight) {
						maxEdges[setTwo] = i;
					}
				}
			}

			for (let i = 0, len = this.graph.vertices.length; i < len; i++) {
				if (maxEdges[i] !== -1) {
					let setOne = this.find(subsets, this.graph.edges[maxEdges[i]].srcVertex.key);
					let setTwo = this.find(subsets, this.graph.edges[maxEdges[i]].destVertex.key);
				
					if (setOne === setTwo) {
						continue;
					}

					boruvkaMSTEdges.push({
						data: {
							id: `e${this.graph.edges[maxEdges[i]].srcVertex.key}-${this.graph.edges[maxEdges[i]].destVertex.key}`,
							source: this.graph.edges[maxEdges[i]].srcVertex.key,
							target: this.graph.edges[maxEdges[i]].destVertex.key,
							weight: `${(this.graph.edges[maxEdges[i]].weight).toFixed(2)} MB`
						}
					});

					this.union(subsets, setOne, setTwo);
					numOfTrees--;
				}
			}
		}

		return boruvkaMSTEdges;
	}
};

module.exports = Boruvka;
