const Graph = require('../data-structures/Graph');
const { resolve } = require('path');

class GraphBuilder {
	constructor(inputFile) {
		if (!inputFile) {
			throw new Error('Missing required parameter inputFile in GraphBuilder');
		}

		this.inputJSON = require(resolve(__dirname, '../../data/parsed', inputFile));
		this.graph = new Graph();

		for (let node of this.inputJSON.nodes) {
			this.graph.addVertex(node.data.id.toString());
		}

		for (let edge of this.inputJSON.edges) {
			this.graph.addEdge(edge.data.source.toString(), edge.data.target.toString(), parseFloat(edge.data.weight), edge.data.weight);
		}
	}
};

module.exports = GraphBuilder;
