import cors from "cors";
import passport from "passport";
import express from "express";
import helmet from "helmet";

import routes from "./routes/v1";
import { jwtStrategy } from "./config/passport";

const app = express();

// Enable CORS
app.use(cors());

// Enable Helmet
app.use(helmet());

// Express use JSON
app.use(express.json());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy)

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/v1", routes);

export default app;
