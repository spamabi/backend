const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('dotenv').config()

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', require('./routes/authRoutes'))
app.get('/', (req, res) => res.send('API server is running'))

const port = process.env.PORT;
app.listen(port, () => console.log(`The server is running on port ${port}`))