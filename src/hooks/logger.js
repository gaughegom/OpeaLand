const DEBUG = process.env.DEBUG;

function debug(message, ...args) {
	if (DEBUG) {
		console.log(message, ...args);
	}
}

const logger = {
	debug,
};

export default logger;
