import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";

import apiEndpoints from "./apiEndpoints.ts";
import { errorHandler } from "./functions.ts";

const app = express();
app.use(bodyParser.json());
app.use("/api", apiEndpoints); // Mounts the router at '/users'

// Error handling
app.use(errorHandler);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
