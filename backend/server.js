require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'tms-backend' }));
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3001;

db.connect()
	.then(() => {
		app.listen(PORT, () => console.log(`TMS backend listening on ${PORT}`));
	})
	.catch(err => {
		console.error('Failed to start server due to DB error');
		process.exit(1);
	});
