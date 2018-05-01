/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-18 00:07:34 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-18 00:53:59
 */
import express from 'express';
import path from 'path';
import http from 'http';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import mongoose from 'mongoose';
import logSymbols from 'log-symbols';
import 'babel-polyfill';

import config from './app.conf';
import routes from './routes';

mongoose.connect(config.DATABASE, config.DB_AUTH);
mongoose.Promise = require('bluebird');

const app = express();
const server = http.Server(app);

const normalizePort = (val) => {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

app.set('port', normalizePort(process.env.PORT || config.API_PORT));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(compress());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('public/images'));

app.use(`${config.API_VERSION}`, routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send({
		status: false,
		statusCode: res.statusCode,
		message: err.message,
		info: {
			ApiUrl: config.API_URL+':'+config.API_PORT+config.API_VERSION
		}
	})
});

server.listen(app.get('port'), () => {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.log(`${logSymbols.success} Server berjalan dengan port ${bind}`);
	console.log(`${logSymbols.success} Silahkan akses API dengan url ${config.API_URL}:${config.API_PORT}${config.API_VERSION}`);  
});

export default server;
