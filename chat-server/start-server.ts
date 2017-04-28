import * as express from 'express';
import * as Log from 'modular-log';
import * as path from 'path';
import * as http from 'http';
import * as SocketIO from 'socket.io';
import config from './config';


let log: Log.Logger;
let server: http.Server;
let appStarted = false;


function killProcess(reason: string, err: any) {
	log ? log.fatal(reason, { err, msg: err.message }) : console.error(reason, err, err.message);
	appStarted && server.close();
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

	// HTTP Server
	log.debug('Starting Server');
	server = http.createServer((req, res) => {
		// Send dummy response
		res.writeHead(404, {'Content-Type': 'text/html'});
		res.end('<h1>Aw, snap! 404</h1>');
	});

	// SocketIO config
	let io = SocketIO.listen(server);
	io.on('connection', conn => {
		log.info('Connection');
		conn.on('message', msg => {
			log.info('Message', msg);
			io.emit('message', msg);
		});
	});

	server.listen(config.server.port, (err) => {
		if (err) {
			return killProcess(`Cannot start server on port ${config.server.port}`, err);
		}
		appStarted = true;
		log.success(`Server started on port ${config.server.port}`);
	});
}
