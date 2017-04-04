import { loadConfig, ENV, CLI } from 'config-decorators';


export class ServerConfig {
	@ENV('SERVER_PORT', 'number')
	@CLI('port', 'number')
	port = 8080;
}

export class LogConfig {
	@ENV('LOG_LEVEL')
	@CLI('level')
	level = 'debug';
}

export default {
	server: loadConfig(ServerConfig),
	log: loadConfig(LogConfig),
};
