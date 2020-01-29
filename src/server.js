const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express();

const chatkit = new Chatkit.default({
	instanceLocator: 'v1:us1:4a929076-6ca8-4396-9515-bbadc3d1e109',
	key:
		'cde9bf63-6ef8-438a-ad22-7f3454f61c8a:weic6O60u/jBV3DqEl2yvrJoe0uzDjp+xFEbwV6rm4s='
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
	const { username } = req.body;
	chatkit
		.createUser({
			id: username,
			name: username
		})
		.then(() => res.sendStatus(201))
		.catch(error => {
			if (error.error === 'services/chatkit/user_already_exists') {
				res.sendStatus(200);
			} else {
				res.status(error.status).json(error);
			}
		});
});

app.post('/authenticate', (req, res) => {
	const authData = chatkit.authenticate({ userId: req.query.user_id });
	res.status(authData.status).send(authData.body);
});

const PORT = 3001;
app.listen(PORT, err => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Running on port ${PORT}`);
	}
});
