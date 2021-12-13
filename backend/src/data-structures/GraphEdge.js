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
};

module.exports = GraphEdge;
