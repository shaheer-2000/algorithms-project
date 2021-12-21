const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const GraphBuilder = require('./lib/graph-builder');
const Prims = require('./algorithms/Prims');
const Kruskal = require('./algorithms/Kruskal');
const Dijkstra = require('./algorithms/Dijkstra');
const BellmanFord = require('./algorithms/BellmanFord');
const FloydWarshall = require('./algorithms/FloydWarshall');
const ClusteringCoefficient = require('./algorithms/ClusteringCoefficient');
const Boruvka = require('./algorithms/Boruvka');

const app = express({
	origin: '159.223.53.40:3000'
});

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

	app.get('/algorithms/kruskal/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}

		if (!graphs[numOfNodes].kruskal) {
			const kruskal = new Kruskal(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const kruskalEdges = kruskal.findMST(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = kruskalEdges;

			graphs[numOfNodes].kruskal = baseGraph;
		}

		res.json(graphs[numOfNodes].kruskal);
	});

	app.get('/algorithms/dijkstra/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}

		if (!graphs[numOfNodes].dijkstra) {
			const dijkstra = new Dijkstra(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const dijkstraEdges = dijkstra.findShortestPath(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = dijkstraEdges;

			graphs[numOfNodes].dijkstra = baseGraph;
		}

		res.json(graphs[numOfNodes].dijkstra);
	});

	app.get('/algorithms/bellman-ford/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}
	
		// TODO: Unsure if working
		if (graphs[numOfNodes].bellmanFord) {
			delete graphs[numOfNodes].bellmanFord;
		}

		if (!graphs[numOfNodes].bellmanFord) {
			const bellmanFord = new BellmanFord(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const bellmanFordEdges = bellmanFord.findShortestPath(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = bellmanFordEdges;

			graphs[numOfNodes].bellmanFord = baseGraph;
		}

		res.json(graphs[numOfNodes].bellmanFord);
	});

	app.get('/algorithms/floyd-warshall/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}
	
		// TODO: unsure if working
		if (graphs[numOfNodes].floydWarshall) {
			delete graphs[numOfNodes].floydWarshall;
		}

		if (!graphs[numOfNodes].floydWarshall) {
			const floydWarshall = new FloydWarshall(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const floydWarshallEdges = floydWarshall.findShortestPath(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = floydWarshallEdges;

			graphs[numOfNodes].floydWarshall = baseGraph;
		}

		res.json(graphs[numOfNodes].floydWarshall);
	});

	app.get('/algorithms/clustering-coefficient/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}
	
		// TODO: unsure if working
		if (graphs[numOfNodes].clusteringCoeff) {
			delete graphs[numOfNodes].clusteringCoeff;
		}

		if (!graphs[numOfNodes].clusteringCoeff) {
			const clusteringCoeff = new ClusteringCoefficient(graphs[numOfNodes].base.graph);
			const { global, locals } = clusteringCoeff.getGlobalCC();
	
			graphs[numOfNodes].clusteringCoeff = {
				global,
				locals
			};
		}

		res.json(graphs[numOfNodes].clusteringCoeff);
	});

	app.get('/algorithms/boruvka/:numOfNodes', (req, res) => {
		const numOfNodes = req.params.numOfNodes;
		if (!graphs[numOfNodes] || !graphs[numOfNodes].base) {
			res.status(404).send({
				error: 'Invalid input requested'
			});

			return;
		}
	
		// TODO: unsure if working
		if (graphs[numOfNodes].boruvka) {
			delete graphs[numOfNodes].boruvka;
		}

		if (!graphs[numOfNodes].boruvka) {
			const boruvka = new Boruvka(graphs[numOfNodes].base.graph);
			const baseGraph = {
				...graphs[numOfNodes].base.inputJSON
			};

			const boruvkaEdges = boruvka.findMST(graphs[numOfNodes].base.inputJSON.sourceNode);
			baseGraph.edges = boruvkaEdges;

			graphs[numOfNodes].boruvka = baseGraph;
		}

		res.json(graphs[numOfNodes].boruvka);
	});

	return app;
};
