import dotenv from "dotenv";
import express from "express";
import path from "path";
import {router} from "./routes"

dotenv.config();

const port = 8081;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// registering the router containing all the endpoints
app.use(router)

// starting the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
