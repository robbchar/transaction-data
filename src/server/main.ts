import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";

import apiEndpoints from "./apiEndpoints.ts";
import { errorHandler } from "./functions.ts";

import { networkInterfaces } from "os";

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
console.log();

const app = express();
app.use(bodyParser.json());
app.use("/api", apiEndpoints); // Mounts the router at '/users'

// Error handling
app.use(errorHandler);

ViteExpress.listen(app, 3000, () =>
  console.log(
    `Server is listening at http://localhost:3000 and http://${results["Wi-Fi"][0]}:3000`
  )
);
