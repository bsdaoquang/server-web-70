/** @format */
const express = require('express');
const cors = require('cors');
const authRouter = require('./src/router/authRouter');
const postRouter = require('./src/router/postRouter');
const {connectToDB} = require('./src/db');
const restaurantRouter = require('./src/router/restaurantsRouter');
require('dotenv').config();

const app = express();
app.use(express.static('public'))
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/restaurants', restaurantRouter)

connectToDB(app)
