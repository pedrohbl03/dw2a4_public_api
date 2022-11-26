import express from "express";

// import cors from 'cors';
// import helmet from 'helmet';
const routes = require("./routes/v1");

const app = express();

// Enable CORS
// app.use(cors());

// Enable Helmet
// app.use(helmet());

// Express use JSON
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/v1", routes);

export default app;
