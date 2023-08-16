/** @format */
const express = require('express');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const postRouter = require('./router/postRouter');
const {connectToDB} = require('./db');
const restaurantRouter = require('./router/restaurantsRouter');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/restaurants', restaurantRouter)

connectToDB(app)
