import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Log from 'modular-log';
import * as path from 'path';
import config from './config';


let log: Log.Logger;
let app: express.Express;
let appStarted = false;


function killProcess(reason: string, err: any) {
	log ? log.fatal(reason, { err, msg: err.message }) : console.error(reason, err, err.message);
	appStarted && (app as any).close();
	setTimeout(() => process.exit(-1), 500);
}

// Setting up uncaughtException and unhandledRejection handlers
process.on('uncaughtException', (err) => killProcess('uncaughtException', err));
process.on('unhandledRejection', (reason, promise) => log.error('unhandledRejection', { reason, promise }));

// Starting the server
startServer()
.catch(err => killProcess('Startup error', err));

async function startServer() {
	// Initializing logger
	Log.setupConsoleLogger(config.log);
	log = Log.createLogger('App');
	log.info('Starting...');

	// Setup express
	log.debug('Preparing Express');
	app = express();
	app.use(bodyParser.json());


	log.info('FileServer enabled');
	/**
	SERVING index.html
	- Works for / or /<whatever>
	*/
	// Serving static files
	app.use(express.static('public'));
	app.get(/\/(\/.*)?$/, (req, res) => {
		res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
	});

	// Starting server
	log.debug('Starting Express');
	app.listen(config.server.port, (err) => {
		if (err) {
			return killProcess(`Cannot start server on port ${config.server.port}`, err);
		}
		appStarted = true;
		log.success(`Server started on port ${config.server.port}`);
	});
}
