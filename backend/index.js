const { existsSync, readdirSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const app = require('./src/server');

const PORT = 8001;

const main = () => {
	if (!existsSync(resolve(__dirname, './data/parsed'))) {
		// TODO: might add a custom logger later
		// TODO: handle exceptions/errors
		console.log('[INFO] Parsed inputs directory does not exist');
		console.log('[INFO] Creating parsed inputs directory');
		mkdirSync(resolve(__dirname, './data/parsed'));
		console.log('[INFO] Parsed inputs directory created');
	}

	const parsedInputs = readdirSync(resolve(__dirname, './data/parsed'));
	if (!parsedInputs || parsedInputs.length <= 0) {
		console.log('[INFO] Inputs have not been parsed');
		console.log('[INFO] Parsing inputs...');
		require('./src/lib/parser')();
		console.log('[INFO] Inputs parsed');
	}

	app(parsedInputs).listen(PORT, () => {
		console.log(`Server listening on port: ${PORT}`);
	});
};

main();
