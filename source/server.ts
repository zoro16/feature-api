import http from "http"
import express, { Router } from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import features from "./routes/features"
import logging from "./config/logging"
import config from "./config/config"
import path from "path"
import fs from "fs"

const NAMESPACE: string = "Server";
const app = express();

const connectToMongo = async () => {
    try {
        await mongoose.connect(config.mongo.url, config.mongo.options);
        logging.info(NAMESPACE, "MongoDB connected");

    } catch (error) {
        logging.error(NAMESPACE, "Error connected to MongoDB", error);
    }
}

connectToMongo();


// create a write stream (in append mode)
// const accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'logs/access.log'),
//     { flags: 'a' }
// );
// // setup the logger
// app.use(morgan('dev', { stream: accessLogStream }));
app.use(morgan('dev'));

//Parse the request
app.use(express.urlencoded({ extended: false }));

// Handle JSON data
app.use(express.json());

// RULES OF OUR API
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');

    // set the CORS headers
    res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With,Content-Type,Accept, Authorization');

    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/', features);


// Server
const server = http.createServer(app);
server.listen(config.server.port, () => {
    return logging.info(NAMESPACE, `The server is running on port ${config.server.port}`)
});

export default server
