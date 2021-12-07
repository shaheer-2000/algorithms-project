const express = require('express');
const cors = require('cors');
const app = express();

const { resolve } = require('path');

app.use(cors());
app.use(express.json());

app.get('/inputs/:numOfNodes', (req, res) => {
	res.json(require(resolve(__dirname, '../data/parsed', `input${req.params.numOfNodes}.json`)));
});

module.exports = app;
