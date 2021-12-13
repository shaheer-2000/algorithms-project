const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const { resolve } = require('path');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/inputs/:numOfNodes', (req, res) => {
	res.json(require(resolve(__dirname, '../data/parsed', `input${req.params.numOfNodes}.json`)));
});

app.get('/algorithms/prims/:numOfNodes', (req, res) => {
	const GraphBuilder = require('./lib/graph-builder');
	const Prims = require('./algorithms/Prims');
	const tenNodeGraph = new GraphBuilder('input10.json');
	const prims = new Prims(tenNodeGraph.graph);
	
	const mst = prims.findMST(1);
	
	const originalInput = require(resolve(__dirname, '../data/parsed', 'input10.json'));
	originalInput.edges = mst.edges;
	res.json(originalInput);
});

module.exports = app;
