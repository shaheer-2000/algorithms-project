class GraphVertex {
	constructor(key) {
		if (!key) {
			throw new Error('Missing required parameter id for GraphVertex');
		}

		this.key = key;
	}
};

module.exports = GraphVertex;
