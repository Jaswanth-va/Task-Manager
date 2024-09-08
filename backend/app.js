import { configDotenv } from "dotenv";
//accessing the env variables
configDotenv();
import "express-async-errors";
import express from "express";
import connectDB from "./db/connectDB.js";
import taskRouter from "./routes/taskRoutes.js";
import authRouter from "./routes/auth.js"
import errorHandlerMiddleware from "./middleware/errorHandler.js";
import routeNotFoundMiddleware from "./middleware/not-found.js";
import authenticateMiddleware from "./middleware/authentication.js"
import { validateToken } from "./controllers/auth.js";
import cors from "cors";
import helmet from "helmet";
import ratelimit from "express-rate-limit";


const app = express();

app.use(ratelimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}))
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get("/", authenticateMiddleware, validateToken);

app.use("/api/v1/auth", authRouter)
app.use("/api/v1", authenticateMiddleware, taskRouter);

app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;


//connecting to the DB and starting the server
async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("database connected");

        app.listen(port, () => {
            console.log("server live on port " + port);

        })
    } catch (error) {
        console.log(error);

    }

}

start();
