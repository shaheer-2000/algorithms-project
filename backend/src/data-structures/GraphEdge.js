class GraphEdge {
	constructor(srcVertex, destVertex, weight, label) {
		if (!srcVertex || !destVertex || !weight) {
			throw new Error('Missing required parameters in creation of GraphEdge');
		}

		this.srcVertex = srcVertex;
		this.destVertex = destVertex;
		this.weight = weight;
		this.label = label || '-';
	}

	toParsedFormat() {
		return {
			data: {
				id: `e${this.srcVertex.key}-${this.destVertex.key}`,
				source: this.srcVertex.key,
				target: this.destVertex.key,
				weight: `${this.weight} MB`
			}
		};
	}
};

module.exports = GraphEdge;
