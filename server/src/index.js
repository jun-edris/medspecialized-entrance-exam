const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3001;

app.use(
	cors({
		origin: ['http://localhost:3000', 'https://localhost:3000'],
		optionsSuccessStatus: 200,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoute);
app.use('/api/admin', adminRoute);

mongoose
	.connect(
		'mongodb+srv://admin:hNRkcYlj9dkXi84I@medspecialized.z4vssip.mongodb.net/ExamDB?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`API running on localhost:${port}`);
		});
	})
	.catch((err) => {
		console.log(err.message);
	});
