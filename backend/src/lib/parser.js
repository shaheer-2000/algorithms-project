const fs = require('fs');
const path = require('path');

const RAW_DATA_PATH = '../../data/raw';
const PARSED_DATA_PATH = '../../data/parsed';

const bytesToMB = (bytes) => (((parseFloat(bytes)) / 1024) / 1024);
const inputParser = (inputContents) => {
	const inputJSON = {
		numOfNodes: 0,
		nodes: [],
		edges: [],
		sourceNode: null
	};

	/*
	stage 0 = number of nodes
	stage 1 = nodes + x,y coords
	stage 2 = edges
	stage 3 = source node
	*/

	let inputStageFlag = -1;
	let linesOfEdgesParsed = 0;
	let nodeNum = 0;
	const edgesCreated = {};
	const alpha = "abcdefghijklmnopqrstuvwxz".split('');

	for (let firstParse of (inputContents.split(/\n/g))) {
		firstParse = (firstParse.split(/\s/g)).filter((item) => item.replace(/\s/g, '').length > 0);
		// skip empty lines
		if (firstParse.length <= 0) {
			continue;
		}

		// ignore first line
		if (inputStageFlag === -1) {
			inputStageFlag = 0;
			continue;
		}

		// number of nodes
		if (inputStageFlag === 0) {
			inputJSON.numOfNodes = parseInt(firstParse[0], 10);
			inputStageFlag = 1;
			continue;
		}

		// nodes
		if (inputStageFlag === 1) {
			if (firstParse[0] === (inputJSON.numOfNodes - 1).toString(10)) {
				inputStageFlag = 2;
			}

			inputJSON.nodes.push({
				data: {
					id: firstParse[0],
				},
				position: {
					x: parseFloat(firstParse[1]) * 1000,
					y: parseFloat(firstParse[2] * 1000)
				}
			});

			continue;
		}

		// edges
		if (inputStageFlag === 2) {
			if (linesOfEdgesParsed === (inputJSON.numOfNodes - 1)) {
				inputStageFlag = 3;
			}

			const edgeSourceNode = nodeNum;
			// console.log(secondParse);
			
			for (let i = 1; i < firstParse.length; i += 4) {
				const edgeDestNode = firstParse[i];
				const edgeWeight = firstParse[i + 2]; // Bandwidth only

				let edgeId = `e${edgeSourceNode}-${edgeDestNode}`;
				let j = 0;
				while (edgesCreated[edgeId]) {
					if(edgesCreated[`${edgeId}${alpha[j]}`]) {
						j++;
						continue;
					}
					edgeId = `${edgeId}${alpha[j]}`;
					break;
				}
				edgesCreated[edgeId] = true;


				inputJSON.edges.push({
					data: {
						id: edgeId,
						source: edgeSourceNode,
						target: edgeDestNode,
						weight: `${bytesToMB(edgeWeight).toFixed(2)} MB`
					}
				});
			}

			nodeNum++;
			linesOfEdgesParsed++;
			continue;
		}

		// source nodes
		if (inputStageFlag === 3) {
			inputJSON.sourceNode = parseInt(firstParse[0], 10);
		}
	}

	return inputJSON;
};

const inputReader = () => {
	const files = fs.readdirSync(path.resolve(__dirname, RAW_DATA_PATH));
	const inputs = [];
	let fileContent = '';

	for (let file of files) {
		if (file.startsWith('input')) {
			fileContent = fs.readFileSync(path.resolve(__dirname, RAW_DATA_PATH, file), {
				encoding: 'utf-8'
			});
			inputs.push(fileContent);
		}
	}
	
	return inputs;
};

const inputWriter = (inputSize, data) => {
	fs.writeFileSync(path.resolve(__dirname, PARSED_DATA_PATH, `input${inputSize}.json`), JSON.stringify(data, null, 4), {
		encoding: 'utf-8'
	});
};

const parse = () => {
	console.log('---STARTING---');
	const parsedInputs = [];
	let i;

	console.log('---READING RAW FILES---');
	const inputs = inputReader();
	console.log('---DONE READING RAW FILES---');

	console.log('---PARSING INPUTS---');
	i = 1;
	const numOfInputs = inputs.length;
	for (let input of inputs) {
		console.log(`---PARSING INPUT ${i} of ${numOfInputs}---`);
		parsedInputs.push(inputParser(input));
		console.log(`---PARSED INPUT ${i++} of ${numOfInputs}---`);
	}
	console.log('---DONE PARSING INPUTS---');

	console.log('---WRITING PARSED INPUTS---');
	i = 1;
	const numOfParsedInputs = parsedInputs.length;
	for (let parsedInput of parsedInputs) {
		console.log(`---WRITING PARSED INPUT ${i} of ${numOfParsedInputs}---`);
		inputWriter(parsedInput.numOfNodes, parsedInput);
		console.log(`---WRITTEN PARSED INPUT ${i++} of ${numOfParsedInputs}---`);
	}
	console.log('---DONE WRITING PARSED INPUTS---');

	console.log('---FINISHED---');
};

module.exports = parse;
