const express = require('express');
const session = require('express-session');
const uuid = require('uuid');
const {
	parse
} = require('url');
const mongoose = require('mongoose');
const next = require('next');
const dotenv = require('dotenv');
dotenv.config();

// Set Environment
const dev = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const mongoAuth = process.env.MONGO_DB_AUTH;

// Next App
const app = next({
	dir: './app',
	dev
});
const handle = app.getRequestHandler();

// const models = require('./models');

/**
 * Frontend Routes
 */
const getRoutes = require('./routes/routeList');
const routes = getRoutes();

app.prepare()
	.then(() => {
		const server = express();

		// Generate Unique Session Secret tokens
		server.use(
			session({
				secret: uuid.v1(),
				name: 'sessionId',
				resave: true,
				saveUninitialized: true,
			})
		);

		server.use(express.urlencoded({
			extended: true
		}));
		server.use(express.json());

		// Use React application on server
		server.get('*', (req, res) => {
			// Parse url param, slashesDenoteHost
			const parsedUrl = parse(req.url, true);
			const {
				pathname,
				query = {}
			} = parsedUrl;

			/**
			 * Pull in frontend routes, and check request against those routes
			 */
			const route = routes[pathname];
			if (route) {
				return app.render(req, res, route.page, query);
			}
			return handle(req, res);
		});

		(async () => {
			try {
				await mongoose.connect('mongodb+srv://clustermongotest-cnm8l.mongodb.net/27017',{
					dbName: 'DB-David',
					useNewUrlParser:true,
					user: 'dleiva04',
					pass: mongoAuth
				});
				console.log('conectado');
			}catch(error){
				console.error(error);
			}

		})();

		// finish connection	
		server.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`> Ready on ${PORT}`);
		});
	})
	.catch((ex) => {
		// Exit if there is an exception
		console.error(ex.stack);
		process.exit(1);
	});