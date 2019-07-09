const express = require('express');
const session = require('express-session');
const uuid = require('uuid');
const {
	parse
} = require('url');
const mongoose = require('mongoose');
const next = require('next');

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

// Sequelize
// const models = require('./models');

/**
 * Front end Routes
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
			 * Pull in front end routes, and check request against those routes
			 */
			const route = routes[pathname];
			if (route) {
				return app.render(req, res, route.page, query);
			}
			return handle(req, res);
		});


		// const uri = 'mongodb+srv://dleiva04:$David04@clustermongotest-cnm8l.mongodb.net/DB-David?retryWrites=true&w=majority';
		// const options = {
		// 	useNewUrlParser: true,
		// 	useCreateIndex: true,
		// 	useFindAndModify: false,
		// 	autoIndex: false, // Don't build indexes	
		// 	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		// 	reconnectInterval: 500, // Reconnect every 500ms
		// 	poolSize: 10, // Maintain up to 10 socket connections
		// 	// If not connected, return errors immediately rather than waiting for reconnect
		// 	bufferMaxEntries: 0,
		// 	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
		// 	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		// 	family: 4 // Use IPv4, skip trying IPv6
		// };
		// mongoose.connect(uri, options).then(
		// 	() => {
		// 		console.log('conn success')
		// 	},
		// 	err => {
		// 		console.log('error', err)
		// 	}
		// );
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