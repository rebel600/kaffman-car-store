import express from "express";
import router from "#routes/index.js";
import { corsMiddleware } from "#middlewares/cors.js";

const app = express();

app.use(corsMiddleware);

app.use(express.json());
app.use("/api/v1/cars",router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
