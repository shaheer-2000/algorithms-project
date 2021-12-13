const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const GraphBuilder = require('./lib/graph-builder');
const Prims = require('./algorithms/Prims');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

module.exports = (parsedInputs) => {
	const graphs = {};

	for (let parsedInput of parsedInputs) {
		graphs[parseInt(parsedInput.split('.').shift().replace('input', ''), 10)] = {
			base: new GraphBuilder(parsedInput)
		};
	}

	app.get('/inputs/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}

		res.json(graphs[numOfNodes].base.inputJSON);
	});

	app.get('/algorithms/prims/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}

		if (!graphs[numOfNodes].prims) {
			const prims = new Prims(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const maxSpanningTree = prims.findMST(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = maxSpanningTree.edges;

			graphs[numOfNodes].prims = baseGraph;
		}

		res.json(graphs[numOfNodes].prims);
	});

	return app;
};
