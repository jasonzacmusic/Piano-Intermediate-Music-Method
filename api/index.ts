import express from "express";
import { setupRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setupRoutes(app);

export default app;
